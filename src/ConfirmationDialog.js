import React from 'react';

const ConfirmationDialog = ({ onConfirm, onCancel }) => (
    <div className="confirmation-dialog" role="dialog" aria-labelledby="dialog-title">
        <h2 id="dialog-title">Submit Survey?</h2>
        <p>Are you sure you want to submit your responses?</p>
        <button onClick={onConfirm} aria-label="Yes, Submit Survey">Yes, Submit</button>
        <button onClick={onCancel} aria-label="No, Go Back">No, Go Back</button>
    </div>
);

export default ConfirmationDialog;