import React from "react";
import { Clock } from "lucide-react";
import "../../Step/Style/DocumentsStep.scss"

export default function DocumentStatus({ uploadedFiles, doc }) {
  return (
    <>
      {uploadedFiles.length > 0 && (
        <div className="doc-status uploaded">
          <div className="doc-status-left">
            <input
              type="checkbox"
              id={`verify-${doc.id}`}
              className="doc-checkbox"
            />
            <label
              htmlFor={`verify-${doc.id}`}
              className="doc-label uploaded-text"
            >
              Document Uploaded
            </label>
          </div>
          <span className="doc-badge uploaded-badge">
            <Clock className="doc-badge-icon" />
            Ready for Verification
          </span>
        </div>
      )}

      {uploadedFiles.length === 0 && (
        <div className="doc-status pending">
          <div className="doc-status-left">
            <input
              type="checkbox"
              id={`verify-${doc.id}`}
              className="doc-checkbox"
              disabled
            />
            <label
              htmlFor={`verify-${doc.id}`}
              className="doc-label pending-text"
            >
              Document Verified
            </label>
          </div>
          <span className="doc-badge pending-badge">
            <Clock className="doc-badge-icon" />
            Pending
          </span>
        </div>
      )}
    </>
  );
}
