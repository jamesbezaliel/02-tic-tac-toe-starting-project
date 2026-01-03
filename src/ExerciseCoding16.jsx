
import React from 'react';

import Review from './Review';

export default function ExerciseCoding16() {
    let [feedback, setFeedback] = React.useState();
    let [student, setStudent] = React.useState();

    function handleFeedback(event) {
        setFeedback(event.target.value);
    }

    function handleStudent(event) {
        setStudent(event.target.value);
    }

  return (
    <>
      <section id="feedback">
        <h2>Please share some feedback</h2>
        <p>
          <label>Your Feedback</label>
          <textarea onChange={handleFeedback} value={feedback} required />
        </p>
        <p>
          <label>Your Name</label>
          <input onChange={handleStudent} value={student} type="text" required />
        </p>
      </section>
      <section id="draft">
        <h2>Your feedback</h2>

        <Review feedback={feedback} student={student} />

        <p>
          <button>Save</button>
        </p>
      </section>
    </>
  );
}


export default function Review({ feedback, student }) {

  return (
    <figure>
      <blockquote>
        <p>{feedback}</p>
      </blockquote>
      <figcaption>{student}</figcaption>
    </figure>
  );
}
