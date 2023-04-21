import { useField } from "formik";
import React, { useState,ClipboardEvent } from "react";
import { InputFieldProps } from "./types";
import Form from 'react-bootstrap/Form';

const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
  const { isProtected } = props
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback = (!!didFocus && (props?.value || '').trim().length > 2) || meta.touched;
  const isValid = meta.error ? 'invalid' : 'valid';
  const errorMessage = meta.error ? meta.error : '';
  
  const preventCopyPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  
  return (
    <div
      className={`${showFeedback ? isValid : ""}`}
    >
      {props?.type !== "textArea" && (
        <div>
        {props?.label && <Form.Label>{props?.label}</Form.Label>}
        <Form.Control 
          placeholder={props?.placeholder || ""} 
          onFocus={handleFocus}  
          {...props} 
          {...field} 
          onCopy={(e: ClipboardEvent<HTMLInputElement>) => isProtected && preventCopyPaste(e)}  
		      onPaste={(e: ClipboardEvent<HTMLInputElement>) => isProtected && preventCopyPaste(e)}  
		      onCut={(e: ClipboardEvent<HTMLInputElement>) => isProtected &&  preventCopyPaste(e)}
          />
        </div>
      )}
     

      <div className="flex items-center space-between">
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="feedback text-sm"
            style={{ textAlign: "left", paddingLeft: "5px", color: "red" }}
          >
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
