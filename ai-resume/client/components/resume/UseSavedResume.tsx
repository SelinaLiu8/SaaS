import React from 'react';

function UseSavedResumeCheckbox({ isChecked, onChange }) {
  return (
    <label htmlFor="useSavedResume">
      <input
        type="checkbox"
        id="useSavedResume"
        checked={isChecked}
        onChange={onChange}
      />
      Use Saved Resume
    </label>
  );
}

export default UseSavedResumeCheckbox;
