package com.jerhe.common.base.exception;

public class BusinessException extends RuntimeException {

	private static final long serialVersionUID = -7201818033623942436L;
	private int errorCode;
	private String errorMessage;

	public BusinessException() {
		super();
	}

	public BusinessException(String message) {
		super(message);
		this.errorMessage = message;
	}

	public BusinessException(String message, Throwable cause) {
		super(message, cause);
		this.errorMessage = message;
	}

	public BusinessException(Throwable cause) {
		super(cause);
	}

	public BusinessException(int errorCode) {
		this.errorCode = errorCode;
	}

	public BusinessException(int errorCode, String message) {
		super(message);
		this.errorCode = errorCode;
		this.errorMessage = message;
	}

	public BusinessException(int errorCode, String message, Throwable cause) {
		super(message, cause);
		this.errorCode = errorCode;
		this.errorMessage = message;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
