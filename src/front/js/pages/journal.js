import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import JournalListSideBarTest from "../component/journalListSideBarTest.js";
import RichEditorExample from "../component/richEditorExample.js";
import { Context } from "../store/appContext";
import MoodSelector from "../component/moodSelector.js";

// import "../../styles/journal.css";

const moodOptions = [
  {
    id: 1,
    name: "Happy",
    description:
      "Feeling joyful and uplifted, a state of general contentment and well-being.",
  },
  {
    id: 2,
    name: "Sad",
    description:
      "Feeling down, blue, or unhappy, often with a decrease in energy or motivation.",
  },
  {
    id: 3,
    name: "Anxious",
    description:
      "Feeling worried, nervous, or uneasy, typically about an imminent event or something with an uncertain outcome.",
  },
  {
    id: 4,
    name: "Angry",
    description:
      "Feeling or showing strong annoyance, displeasure, or hostility.",
  },
];

const Journal = () => {
  const { store, actions } = useContext(Context);
  const { journalId } = useParams();
  const [editorContent, setEditorContent] = useState("");
  const [moodContent, setMoodContent] = useState("");

  useEffect(() => {
    if (journalId) {
      const selectedJournal = store.journals.find(
        (j) => j.id === parseInt(journalId)
      );
      if (selectedJournal) {
        setEditorContent(selectedJournal.content);
        setMoodContent(selectedJournal.mood_id.toString());
      }
    }
  }, [journalId, store.journals]);

  const handleMoodChange = (selectedMoodId) => {
    setMoodContent(selectedMoodId);
    console.log(`Selected mood ID: ${selectedMoodId}`); // Optional: for debugging
  };

  const handleSubmit = () => {
    const journal = {
      content: editorContent,
      mood_id: parseInt(moodContent, 10), // parse moodContent to ensure it's an integer
    };
    actions.submitJournal(journal);
    console.log(editorContent);
    console.log(moodContent);
  };

  return (
    <div className="journal-body container-fluid">
      <div className="row">
        <div className="col-md-3 side-bar vh-100 overflow-auto">
          <JournalListSideBarTest />
        </div>
        <div className="col-md-9 d-flex">
          <div style={{ width: "100%" }}>
            <div className="col-md-6">
              <div className="editorContainer text-center">
                <h2 className="mb-5 mt-5">Your New Journal Entry</h2>
                <div className="mt-3 d-flex flex-column align-items-center justify-content-center">
                  <MoodSelector
                    moods={moodOptions}
                    onMoodChange={handleMoodChange}
                    initialMoodId={moodContent}
                  />
                  <RichEditorExample
                    onContentChange={setEditorContent}
                    initialContent={editorContent}
                  />

                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn px-5 py-2 mt-3"
                    style={{
                      background:
                        "linear-gradient(45deg, #0947FE, #0197F8, #01D6F8)",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
