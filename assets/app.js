import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import * as Tone from "tone";
import { jsPDF } from "jspdf";

import {
  MODULE2_SCENES,
  MODULE2_SCENE_COUNT
} from "./module2-scenes.js";

import { MODULE2_QUIZ } from "./module2-quiz.js";

const e = React.createElement;

const INTRO_AUDIO = "./assets/audio/LOAM2A.mp3";
const RUNTIME_AUDIO = "./assets/audio/LOAM2B.mp3";
const DEFAULT_FACE = "./assets/alfi-character.png";

const MIDPOINT_SCENE_INDEX = Math.floor(MODULE2_SCENE_COUNT / 2);

const LOCATION_PLAN = [
  {
    key: "atrium",
    outsideLabel: "Westbridge Atrium",
    insideLabel: "Main Teaching Atrium",
    startSceneId: 1,
    endSceneId: 1
  },
  {
    key: "immunology",
    outsideLabel: "Immunology Wing",
    insideLabel: "Teaching Conference Room",
    startSceneId: 2,
    endSceneId: 8
  },
  {
    key: "infectious",
    outsideLabel: "Infectious Disease Wing",
    insideLabel: "Case Discussion Room",
    startSceneId: 9,
    endSceneId: 12
  },
  {
    key: "oncology",
    outsideLabel: "Oncology Pavilion",
    insideLabel: "Heme-Onc Classroom",
    startSceneId: 13,
    endSceneId: 17
  },
  {
    key: "hematology",
    outsideLabel: "Hematology Center",
    insideLabel: "Blood Disorders Lab",
    startSceneId: 18,
    endSceneId: 23
  },
  {
    key: "hemostasis",
    outsideLabel: "Hemostasis Simulation Lab",
    insideLabel: "Coagulation Skills Suite",
    startSceneId: 24,
    endSceneId: 28
  },
  {
    key: "cardio",
    outsideLabel: "Cardio-Thrombotic Center",
    insideLabel: "Acute Care Simulation Bay",
    startSceneId: 29,
    endSceneId: 33
  }
];

function getLocationForSceneId(sceneId) {
  return (
    LOCATION_PLAN.find(
      (loc) => sceneId >= loc.startSceneId && sceneId <= loc.endSceneId
    ) || LOCATION_PLAN[0]
  );
}

function enrichScene(scene) {
  const loc = getLocationForSceneId(scene.id);
  return {
    ...scene,
    locationKey: loc.key,
    outsideLabel: loc.outsideLabel,
    insideLabel: loc.insideLabel
  };
}

const ENRICHED_SCENES = MODULE2_SCENES.map(enrichScene);

function getSceneByIndex(index) {
  return ENRICHED_SCENES[index] || null;
}

function getNextScene(index) {
  return ENRICHED_SCENES[index + 1] || null;
}

function getPreviousScene(index) {
  return ENRICHED_SCENES[index - 1] || null;
}

function sameLocation(sceneA, sceneB) {
  if (!sceneA || !sceneB) return false;
  return sceneA.locationKey === sceneB.locationKey;
}

function computeNextAreaType(currentScene, nextScene) {
  if (!currentScene || !nextScene) return "outside";
  return sameLocation(currentScene, nextScene) ? "inside" : "outside";
}

function getRemainingQuizIds(scene, userAnswers) {
  if (!scene || !Array.isArray(scene.quizIds)) return [];
  return scene.quizIds.filter((quizId) => userAnswers[quizId] === undefined);
}

function getSceneQuizSummary(scene, userAnswers) {
  const quizIds = Array.isArray(scene.quizIds) ? scene.quizIds : [];
  const total = quizIds.length;
  const answered = quizIds.filter((quizId) => userAnswers[quizId] !== undefined).length;
  const correct = quizIds.filter((quizId) => userAnswers[quizId] === true).length;
  return { total, answered, correct };
}

const ALL_QUIZ_IDS = Object.keys(MODULE2_QUIZ)
  .map((key) => Number(key))
  .filter((value) => Number.isFinite(value))
  .sort((a, b) => a - b);

function getUnansweredGlobalQuizIds(userAnswers) {
  return ALL_QUIZ_IDS.filter((quizId) => userAnswers[quizId] === undefined);
}

function encodeSave(payload) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function decodeSave(code) {
  return JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
}

function useDualAudio() {
  const introRef = useRef(null);
  const runtimeRef = useRef(null);

  const [musicEnabled, setMusicEnabled] = useState(true);
  const [audioPhase, setAudioPhase] = useState("intro");

  useEffect(() => {
    const intro = new Audio(INTRO_AUDIO);
    intro.preload = "auto";
    intro.loop = true;
    intro.volume = 0.42;

    const runtime = new Audio(RUNTIME_AUDIO);
    runtime.preload = "auto";
    runtime.loop = true;
    runtime.volume = 0.42;

    introRef.current = intro;
    runtimeRef.current = runtime;

    return () => {
      try {
        intro.pause();
        runtime.pause();
        intro.currentTime = 0;
        runtime.currentTime = 0;
      } catch {}
    };
  }, []);

  const unlock = async () => {
    try {
      await Tone.start();
    } catch {}
  };

  const stopAll = () => {
    [introRef.current, runtimeRef.current].forEach((audio) => {
      if (!audio) return;
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {}
    });
  };

  const pauseAll = () => {
    [introRef.current, runtimeRef.current].forEach((audio) => {
      if (!audio) return;
      try {
        audio.pause();
      } catch {}
    });
    setAudioPhase("paused");
  };

  const playForSceneIndex = async (sceneIndex, forceIntro = false) => {
    if (!musicEnabled) return;

    await unlock();

    const shouldUseRuntime = !forceIntro && sceneIndex >= MIDPOINT_SCENE_INDEX;
    const primary = shouldUseRuntime ? runtimeRef.current : introRef.current;
    const secondary = shouldUseRuntime ? introRef.current : runtimeRef.current;

    try {
      secondary?.pause();
    } catch {}

    try {
      await primary?.play();
      setAudioPhase(shouldUseRuntime ? "runtime" : "intro");
    } catch {
      setAudioPhase("blocked");
    }
  };

  const toggleMusic = async (sceneIndex) => {
    const nextEnabled = !musicEnabled;
    setMusicEnabled(nextEnabled);

    if (!nextEnabled) {
      pauseAll();
      setAudioPhase("muted");
      return;
    }

    await playForSceneIndex(sceneIndex);
  };

  return {
    musicEnabled,
    audioPhase,
    playForSceneIndex,
    pauseAll,
    stopAll,
    toggleMusic
  };
}

function TitleSplash({ onStart }) {
  return e("div", { className: "screen scanlines" },
    e("div", { className: "center-col" },
      e("div", { className: "subtitle" }, "DR. MODALI LEARNING LABS"),
      e("h1", { className: "title" }, "A DAY IN THE LIFE OF ALFIE"),
      e("div", { className: "subtitle" }, "MODULE 2"),
      e("button", { className: "btn-cyber", onClick: onStart }, "ENTER THE LIFE OF ALFIE")
    )
  );
}

function MatrixFlashScreen() {
  return e("div", { className: "screen scanlines" },
    e("div", { className: "center-col" },
      e("div", { className: "matrix-flash" }, "DR. MODALI LEARNING LABS")
    )
  );
}

function IdentityScreen({
  playerName,
  setPlayerName,
  faceSrc,
  setFaceSrc,
  restoreCode,
  setRestoreCode,
  onRestore,
  onContinue
}) {
  const fileInputRef = useRef(null);

  return e("div", { className: "screen scanlines" },
    e("div", { className: "center-col" },
      e("div", { className: "identity-shell card" },
        e("div", { className: "identity-left" },
          e("img", { src: faceSrc, className: "alfi-preview", alt: "Alfie avatar" }),
          e("div", { className: "small-row" },
            e("button", {
              className: "btn-cyber",
              onClick: () => fileInputRef.current?.click()
            }, "SWAP FACE"),
            e("input", {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              style: { display: "none" },
              onChange: (ev) => {
                const file = ev.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (readerEvent) => {
                  setFaceSrc(readerEvent.target.result);
                };
                reader.readAsDataURL(file);
              }
            })
          )
        ),
        e("div", { className: "identity-right" },
          e("div", { className: "field" },
            e("label", null, "STUDENT NAME"),
            e("input", {
              className: "input-cyber",
              value: playerName,
              placeholder: "ENTER NAME",
              onChange: (ev) => setPlayerName(ev.target.value)
            })
          ),
          e("div", { className: "field" },
            e("label", null, "RESTORE SAVE CODE"),
            e("textarea", {
              className: "textarea-cyber",
              rows: 6,
              value: restoreCode,
              placeholder: "PASTE SAVE CODE HERE",
              onChange: (ev) => setRestoreCode(ev.target.value)
            })
          ),
          e("div", { className: "small-row", style: { justifyContent: "flex-start" } },
            e("button", { className: "btn-cyber", onClick: onRestore }, "RESTORE SESSION"),
            e("button", { className: "btn-cyber", onClick: onContinue }, "AUDIO: TAP TO ENABLE")
          )
        )
      )
    )
  );
}

function MissionBriefingScreen({ playerName, onBegin }) {
  return e("div", { className: "screen scanlines" },
    e("div", { className: "center-col" },
      e("h1", { className: "title" }, "MISSION BRIEFING"),
      e("div", { className: "subtitle" }, `WELCOME ${playerName || "STUDENT"}`),
      e("div", { className: "subtitle", style: { maxWidth: "900px", lineHeight: 1.7 } },
        "Module 2 preserves the Alfie shell while replacing all content, buildings, mechanisms, and quiz material with Module 2 sources."
      ),
      e("div", { className: "subtitle", style: { maxWidth: "900px", lineHeight: 1.7 } },
        "Enter the correct buildings, remain inside when the story remains there, complete mechanism checks, and export your report at the end."
      ),
      e("button", { className: "btn-cyber", onClick: onBegin }, "BEGIN MISSION")
    )
  );
}

function QuizOverlay({ quiz, scene, onSubmit }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setSelectedIndex(null);
    setRevealed(false);
  }, [quiz?.question]);

  if (!quiz) return null;

  const correctIndex = quiz.answer;
  const explanation = quiz.explanation || `Mechanism review: ${scene.mechanism}`;

  const submitAnswer = (index) => {
    if (revealed) return;
    setSelectedIndex(index);
    setRevealed(true);
  };

  return e("div", { className: "overlay" },
    e("div", { className: "modal" },
      e("div", { className: "subtitle" }, `MECHANISM CHECK • SCENE ${scene.id}`),
      e("h2", { className: "scene-title" }, quiz.question),
      e("div", { className: "quiz-options" },
        quiz.options.map((opt, index) => {
          const isCorrect = index === correctIndex;
          const isSelected = index === selectedIndex;

          let inlineStyle = null;
          if (revealed) {
            inlineStyle = {
              borderColor: isCorrect ? "#00ff41" : (isSelected ? "#ff6b6b" : "rgba(0,255,65,.2)"),
              color: isCorrect ? "#00ff41" : (isSelected ? "#ff6b6b" : "#e7ffe9")
            };
          }

          return e("button", {
            key: index,
            className: "btn-cyber quiz-option",
            style: inlineStyle,
            disabled: revealed,
            onClick: () => submitAnswer(index)
          }, `${String.fromCharCode(65 + index)}. ${opt}`);
        })
      ),
      revealed && e("div", { className: "result-box" },
        e("div", null, `Correct answer: ${String.fromCharCode(65 + correctIndex)}.`),
        e("div", { style: { marginTop: "8px" } }, explanation),
        e("div", { className: "small-row", style: { justifyContent: "flex-start", marginTop: "14px" } },
          e("button", {
            className: "btn-cyber",
            onClick: () => onSubmit(selectedIndex === correctIndex)
          }, "RESUME MISSION")
        )
      )
    )
  );
}

function SaveCodeOverlay({ saveCode, onClose }) {
  return e("div", { className: "overlay" },
    e("div", { className: "modal" },
      e("h2", { className: "scene-title" }, "SAVE CODE GENERATED"),
      e("textarea", {
        className: "textarea-cyber",
        rows: 12,
        readOnly: true,
        value: saveCode,
        style: { width: "100%" }
      }),
      e("div", { className: "small-row", style: { justifyContent: "flex-start", marginTop: "14px" } },
        e("button", {
          className: "btn-cyber",
          onClick: async () => {
            try {
              await navigator.clipboard.writeText(saveCode);
            } catch {}
          }
        }, "COPY"),
        e("button", { className: "btn-cyber", onClick: onClose }, "CLOSE")
      )
    )
  );
}

function CaseLogOverlay({ scenes, userAnswers, onClose }) {
  return e("div", { className: "overlay" },
    e("div", { className: "modal" },
      e("h2", { className: "scene-title" }, "CASE LOG"),
      e("div", { className: "log-list" },
        scenes.map((scene) => {
          const summary = getSceneQuizSummary(scene, userAnswers);
          return e("div", { key: scene.id, className: "log-item" },
            e("div", { className: "subtitle" }, `SCENE ${scene.id} • ${scene.title}`),
            e("div", { style: { color: "#e7ffe9", marginTop: "6px", lineHeight: 1.5 } }, scene.mechanism),
            e("div", { className: "footer-note", style: { marginTop: "8px" } },
              summary.total === 0
                ? "Quiz: no questions in this scene"
                : `Quiz progress: ${summary.answered}/${summary.total} answered • ${summary.correct} correct`
            )
          );
        })
      ),
      e("div", { className: "small-row", style: { justifyContent: "flex-start", marginTop: "14px" } },
        e("button", { className: "btn-cyber", onClick: onClose }, "CLOSE")
      )
    )
  );
}

function WorldScreen({
  scene,
  sceneIndex,
  totalScenes,
  currentAreaType,
  playerName,
  faceSrc,
  score,
  musicEnabled,
  audioPhase,
  onEnterBuilding,
  onNext,
  onPrev,
  onSave,
  onOpenLog,
  onToggleMusic,
  onExportPdf,
  quizProgressText
}) {
  const currentLocation = getLocationForSceneId(scene.id);

  return e("div", { className: "screen scanlines world-shell" },
    e("div", { className: "hud" },
      e("div", { className: "group" },
        e("div", { className: "hud-tag" }, `PLAYER: ${playerName || "STUDENT"}`),
        e("div", { className: "hud-tag" }, `SCENE: ${sceneIndex + 1}/${totalScenes}`),
        e("div", { className: "hud-tag" }, `SCORE: ${score}`)
      ),
      e("div", { className: "group" },
        e("div", { className: "hud-tag" }, `AUDIO: ${musicEnabled ? audioPhase.toUpperCase() : "MUTED"}`),
        e("button", { className: "btn-cyber", onClick: onToggleMusic }, musicEnabled ? "MUSIC OFF" : "MUSIC ON"),
        e("button", { className: "btn-cyber", onClick: onOpenLog }, "LOG"),
        e("button", { className: "btn-cyber", onClick: onSave }, "SAVE")
      )
    ),

    e("div", { className: "viewport" },
      e("div", { className: "location-stage" },
        e("div", { className: "location-header" },
          e("div", { className: "location-badge" }, currentLocation.outsideLabel),
          e("div", { className: "area-badge" },
            currentAreaType === "outside" ? "OUTSIDE APPROACH" : currentLocation.insideLabel
          )
        ),

        e("div", { className: "stage-center" },
          e("div", { className: "avatar-rig" },
            e("img", { src: faceSrc, alt: "Alfie avatar" }),
            e("div", { className: "avatar-name" }, "ALFIE")
          ),

          currentAreaType === "outside"
            ? e("div", { className: "outside-card" },
                e("h2", { className: "scene-title" }, `Arrival: ${currentLocation.outsideLabel}`),
                e("div", { className: "scene-trigger" }, `Next required scene: ${scene.title}`),
                e("div", { className: "scene-body" },
                  "Alfie is outside the next required building. Enter to continue the story. If the next scene remains in the same location, Alfie will stay inside and will not be thrown back outside."
                ),
                e("div", { className: "building-grid" },
                  LOCATION_PLAN.map((loc) =>
                    e("div", {
                      key: loc.key,
                      className: `building-card ${loc.key === currentLocation.key ? "active" : ""}`
                    },
                      e("div", null, loc.outsideLabel),
                      e("div", { className: "footer-note" }, loc.insideLabel)
                    )
                  )
                ),
                e("div", { className: "small-row", style: { justifyContent: "flex-start" } },
                  e("button", {
                    className: "btn-cyber",
                    onClick: onEnterBuilding
                  }, `PRESS E / ENTER ${currentLocation.outsideLabel.toUpperCase()}`)
                )
              )
            : e("div", { className: "inside-card" },
                e("div", { className: "subtitle" }, currentLocation.insideLabel),
                e("h2", { className: "scene-title" }, scene.title),
                e("div", { className: "scene-trigger" }, scene.trigger),
                e("div", { className: "scene-body" }, scene.mechanism),
                e("div", { className: "scene-cue" }, `VISUAL CUE: ${scene.visualCue || "—"}`),
                e("div", { className: "footer-note" }, quizProgressText)
              )
        )
      )
    ),

    e("div", { className: "narrative-tray" },
      e("div", null,
        e("div", { className: "tray-title" },
          currentAreaType === "outside"
            ? `NEXT LOCATION • ${currentLocation.outsideLabel}`
            : `NARRATIVE TRAY • ${scene.title}`
        ),
        e("div", { className: "tray-text" },
          currentAreaType === "outside"
            ? `Outside state preserved. Alfie must enter ${currentLocation.outsideLabel} before the scene can proceed.`
            : `${scene.title}: ${scene.mechanism}`
        )
      ),
      e("div", { className: "controls" },
        e("button", {
          className: "btn-cyber",
          disabled: sceneIndex === 0,
          onClick: onPrev
        }, "PREV"),

        currentAreaType === "outside"
          ? e("button", { className: "btn-cyber", onClick: onEnterBuilding }, "ENTER")
          : e("button", {
              className: "btn-cyber",
              onClick: onNext
            }, sceneIndex === totalScenes - 1 ? "FINISH" : "NEXT"),

        e("button", { className: "btn-cyber", onClick: onExportPdf }, "SAVE PDF")
      )
    )
  );
}

function FinalQuizSweepScreen({ remainingCount, score, totalQuizCount }) {
  return e("div", { className: "screen scanlines" },
    e("div", { className: "center-col" },
      e("div", { className: "identity-shell card" },
        e("h1", { className: "title" }, "FINAL QUIZ SWEEP"),
        e("div", { className: "subtitle" }, `Remaining quiz questions: ${remainingCount}`),
        e("div", { className: "subtitle" }, `Answered so far: ${totalQuizCount - remainingCount}/${totalQuizCount}`),
        e("div", { className: "subtitle", style: { maxWidth: "860px", lineHeight: 1.7 } },
          "Any quiz questions not naturally encountered during the story are being delivered now so the full Module 2 question bank is reachable without modifying module2-scenes.js or module2-quiz.js."
        ),
        e("div", { className: "subtitle" }, `Current score: ${score}`)
      )
    )
  );
}

function EndScreen({ playerName, score, totalScenes, onRestart, onExportPdf }) {
  return e("div", { className: "screen scanlines" },
    e("div", { className: "center-col" },
      e("div", { className: "end-grid" },
        e("h1", { className: "title" }, "MODULE 2 COMPLETE"),
        e("div", { className: "subtitle" }, `STUDENT: ${playerName || "STUDENT"}`),
        e("div", { className: "subtitle" }, `FINAL SCORE: ${score}`),
        e("div", { className: "subtitle" }, `SCENES COMPLETED: ${totalScenes}/${totalScenes}`),
        e("div", { className: "small-row" },
          e("button", { className: "btn-cyber", onClick: onExportPdf }, "SAVE PDF"),
          e("button", { className: "btn-cyber", onClick: onRestart }, "RESTART")
        )
      )
    )
  );
}

function App() {
  const [phase, setPhase] = useState("title");
  const [playerName, setPlayerName] = useState("");
  const [faceSrc, setFaceSrc] = useState(DEFAULT_FACE);

  const [restoreCode, setRestoreCode] = useState("");
  const [saveCode, setSaveCode] = useState("");
  const [showSaveOverlay, setShowSaveOverlay] = useState(false);
  const [showLogOverlay, setShowLogOverlay] = useState(false);

  const [sceneIndex, setSceneIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(getSceneByIndex(0)?.locationKey || LOCATION_PLAN[0].key);
  const [currentAreaType, setCurrentAreaType] = useState("outside");

  const [pendingQuizId, setPendingQuizId] = useState(null);
  const [pendingQuizSource, setPendingQuizSource] = useState(null); // scene | sweep | null
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const audio = useDualAudio();

  const scene = getSceneByIndex(sceneIndex);
  const pendingQuiz = pendingQuizId ? MODULE2_QUIZ[pendingQuizId] : null;
  const remainingQuizIds = getRemainingQuizIds(scene, userAnswers);
  const unansweredGlobalQuizIds = getUnansweredGlobalQuizIds(userAnswers);
  const sceneQuizSummary = scene ? getSceneQuizSummary(scene, userAnswers) : { total: 0, answered: 0, correct: 0 };
  const quizProgressText = sceneQuizSummary.total === 0
    ? "No quiz questions assigned to this scene."
    : `Quiz progress for this scene: ${sceneQuizSummary.answered}/${sceneQuizSummary.total} answered • ${sceneQuizSummary.correct} correct.`;

  useEffect(() => {
    if (phase === "flash") {
      audio.playForSceneIndex(0, true);
      const timer = setTimeout(() => {
        setPhase("identity");
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (scene) {
      setCurrentLocation(scene.locationKey);
    }
  }, [sceneIndex, scene]);

  useEffect(() => {
    if ((phase === "world" || phase === "finalQuiz") && !pendingQuizId) {
      audio.playForSceneIndex(sceneIndex);
    }
  }, [phase, sceneIndex, pendingQuizId]);

  useEffect(() => {
    if (phase !== "finalQuiz" || pendingQuizId) return;

    const stillMissing = getUnansweredGlobalQuizIds(userAnswers);

    if (stillMissing.length > 0) {
      setPendingQuizId(stillMissing[0]);
      setPendingQuizSource("sweep");
      audio.pauseAll();
      return;
    }

    audio.stopAll();
    setPendingQuizSource(null);
    setPhase("end");
  }, [phase, pendingQuizId, userAnswers]);

  const handleRestore = () => {
    try {
      const restored = decodeSave(restoreCode);

      setPlayerName(restored.playerName || "");
      setFaceSrc(restored.faceSrc || DEFAULT_FACE);
      setSceneIndex(restored.sceneIndex || 0);
      setScore(restored.score || 0);
      setUserAnswers(restored.userAnswers || {});
      setPendingQuizId(restored.pendingQuizId || null);
      setPendingQuizSource(restored.pendingQuizSource || null);
      setCurrentAreaType(restored.currentAreaType || "outside");
      setCurrentLocation(
        restored.currentLocation ||
        getSceneByIndex(restored.sceneIndex || 0)?.locationKey ||
        LOCATION_PLAN[0].key
      );
      setPhase(restored.phase || "briefing");

      if (restored.musicEnabled === false && audio.musicEnabled) {
        audio.toggleMusic(restored.sceneIndex || 0);
      }
    } catch {
      alert("Invalid save code.");
    }
  };

  const handleGenerateSave = () => {
    const payload = {
      phase,
      playerName,
      faceSrc,
      sceneIndex,
      score,
      userAnswers,
      pendingQuizId,
      pendingQuizSource,
      musicEnabled: audio.musicEnabled,
      audioPhase: audio.audioPhase,
      currentLocation,
      currentAreaType
    };

    const encoded = encodeSave(payload);
    setSaveCode(encoded);
    setShowSaveOverlay(true);
  };

  const handleEnterBuilding = () => {
    setCurrentAreaType("inside");
  };

  const handlePrev = () => {
    if (sceneIndex === 0 || phase === "finalQuiz") return;

    const previousScene = getPreviousScene(sceneIndex);
    const currentScene = getSceneByIndex(sceneIndex);

    setPendingQuizId(null);
    setPendingQuizSource(null);
    setSceneIndex((prev) => prev - 1);

    if (previousScene) {
      setCurrentLocation(previousScene.locationKey);
      setCurrentAreaType(sameLocation(previousScene, currentScene) ? "inside" : "outside");
    }
  };

  const handleNext = () => {
    if (!scene) return;
    if (phase === "finalQuiz") return;
    if (currentAreaType === "outside") return;

    if (remainingQuizIds.length > 0 && !pendingQuizId) {
      setPendingQuizId(remainingQuizIds[0]);
      setPendingQuizSource("scene");
      audio.pauseAll();
      return;
    }

    if (sceneIndex >= MODULE2_SCENE_COUNT - 1) {
      if (unansweredGlobalQuizIds.length > 0) {
        setPendingQuizId(unansweredGlobalQuizIds[0]);
        setPendingQuizSource("sweep");
        setPhase("finalQuiz");
        audio.pauseAll();
        return;
      }

      audio.stopAll();
      setPhase("end");
      return;
    }

    const currentScene = getSceneByIndex(sceneIndex);
    const nextScene = getNextScene(sceneIndex);

    setPendingQuizId(null);
    setPendingQuizSource(null);
    setSceneIndex((prev) => prev + 1);

    if (nextScene) {
      setCurrentLocation(nextScene.locationKey);
      setCurrentAreaType(computeNextAreaType(currentScene, nextScene));
    }
  };

  const handleQuizSubmit = (isCorrect) => {
    if (!pendingQuizId) return;

    const submittedQuizId = pendingQuizId;
    const nextAnswers = {
      ...userAnswers,
      [submittedQuizId]: isCorrect
    };

    setUserAnswers(nextAnswers);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (pendingQuizSource === "sweep") {
      const stillMissing = getUnansweredGlobalQuizIds(nextAnswers);

      if (stillMissing.length > 0) {
        setPendingQuizId(stillMissing[0]);
        setPendingQuizSource("sweep");
        return;
      }

      setPendingQuizId(null);
      setPendingQuizSource(null);
      audio.stopAll();
      setPhase("end");
      return;
    }

    const remainingSceneQuizIds = getRemainingQuizIds(scene, nextAnswers).filter(
      (quizId) => quizId !== submittedQuizId
    );

    if (remainingSceneQuizIds.length > 0) {
      setPendingQuizId(remainingSceneQuizIds[0]);
      setPendingQuizSource("scene");
      return;
    }

    setPendingQuizId(null);
    setPendingQuizSource(null);
    audio.playForSceneIndex(sceneIndex);
  };

  const handleExportPdf = () => {
    const pdf = new jsPDF();

    pdf.setFont("courier", "normal");
    pdf.setFontSize(18);
    pdf.text("A Day in the Life of Alfie — Module 2", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Student: ${playerName || "STUDENT"}`, 20, 34);
    pdf.text(`Score: ${score}`, 20, 42);
    pdf.text(`Scenes Completed: ${phase === "end" ? MODULE2_SCENE_COUNT : sceneIndex + 1} / ${MODULE2_SCENE_COUNT}`, 20, 50);
    pdf.text(`Quiz Coverage: ${ALL_QUIZ_IDS.length - getUnansweredGlobalQuizIds(userAnswers).length}/${ALL_QUIZ_IDS.length}`, 20, 58);

    let y = 72;

    ENRICHED_SCENES.forEach((sceneItem) => {
      if (y > 268) {
        pdf.addPage();
        y = 20;
      }

      const summary = getSceneQuizSummary(sceneItem, userAnswers);
      const quizSummaryText = summary.total === 0
        ? "No quiz questions"
        : `Quiz ${summary.answered}/${summary.total} answered, ${summary.correct} correct`;

      pdf.setFontSize(11);
      pdf.text(`${sceneItem.id}. ${sceneItem.title}`, 20, y);
      y += 6;

      pdf.setFontSize(9);
      const wrapped = pdf.splitTextToSize(
        `${sceneItem.trigger} | ${sceneItem.mechanism} | ${quizSummaryText}`,
        165
      );
      pdf.text(wrapped, 24, y);
      y += wrapped.length * 5 + 4;
    });

    if (y > 220) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFontSize(11);
    pdf.text("Global Quiz Coverage", 20, y);
    y += 6;
    pdf.setFontSize(9);
    const coverageWrapped = pdf.splitTextToSize(
      `Answered quiz IDs: ${ALL_QUIZ_IDS.filter((quizId) => userAnswers[quizId] !== undefined).join(", ") || "none"}`,
      165
    );
    pdf.text(coverageWrapped, 24, y);

    pdf.save(`ADITLOA_Module2_${(playerName || "Student").replace(/\s+/g, "_")}.pdf`);
  };

  const handleRestart = () => {
    audio.stopAll();
    setPhase("title");
    setPlayerName("");
    setFaceSrc(DEFAULT_FACE);
    setRestoreCode("");
    setSaveCode("");
    setShowSaveOverlay(false);
    setShowLogOverlay(false);
    setSceneIndex(0);
    setCurrentLocation(getSceneByIndex(0)?.locationKey || LOCATION_PLAN[0].key);
    setCurrentAreaType("outside");
    setPendingQuizId(null);
    setPendingQuizSource(null);
    setScore(0);
    setUserAnswers({});
  };

  if (phase === "title") {
    return e(TitleSplash, { onStart: () => setPhase("flash") });
  }

  if (phase === "flash") {
    return e(MatrixFlashScreen);
  }

  if (phase === "identity") {
    return e(IdentityScreen, {
      playerName,
      setPlayerName,
      faceSrc,
      setFaceSrc,
      restoreCode,
      setRestoreCode,
      onRestore: handleRestore,
      onContinue: () => setPhase("briefing")
    });
  }

  if (phase === "briefing") {
    return e(MissionBriefingScreen, {
      playerName,
      onBegin: () => setPhase("world")
    });
  }

  if (phase === "world") {
    return e(React.Fragment, null,
      e(WorldScreen, {
        scene,
        sceneIndex,
        totalScenes: MODULE2_SCENE_COUNT,
        currentAreaType,
        playerName,
        faceSrc,
        score,
        musicEnabled: audio.musicEnabled,
        audioPhase: audio.audioPhase,
        onEnterBuilding: handleEnterBuilding,
        onNext: handleNext,
        onPrev: handlePrev,
        onSave: handleGenerateSave,
        onOpenLog: () => setShowLogOverlay(true),
        onToggleMusic: () => audio.toggleMusic(sceneIndex),
        onExportPdf: handleExportPdf,
        quizProgressText
      }),
      pendingQuiz && e(QuizOverlay, {
        quiz: pendingQuiz,
        scene,
        onSubmit: handleQuizSubmit
      }),
      showSaveOverlay && e(SaveCodeOverlay, {
        saveCode,
        onClose: () => setShowSaveOverlay(false)
      }),
      showLogOverlay && e(CaseLogOverlay, {
        scenes: ENRICHED_SCENES,
        userAnswers,
        onClose: () => setShowLogOverlay(false)
      })
    );
  }

  if (phase === "finalQuiz") {
    return e(React.Fragment, null,
      e(FinalQuizSweepScreen, {
        remainingCount: unansweredGlobalQuizIds.length,
        score,
        totalQuizCount: ALL_QUIZ_IDS.length
      }),
      pendingQuiz && e(QuizOverlay, {
        quiz: pendingQuiz,
        scene: scene || { id: "FINAL", mechanism: "Final catch-up quiz delivery" },
        onSubmit: handleQuizSubmit
      }),
      showSaveOverlay && e(SaveCodeOverlay, {
        saveCode,
        onClose: () => setShowSaveOverlay(false)
      })
    );
  }

  if (phase === "end") {
    return e(EndScreen, {
      playerName,
      score,
      totalScenes: MODULE2_SCENE_COUNT,
      onRestart: handleRestart,
      onExportPdf: handleExportPdf
    });
  }

  return null;
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root mount element in index.html");
}

createRoot(rootElement).render(e(App));
