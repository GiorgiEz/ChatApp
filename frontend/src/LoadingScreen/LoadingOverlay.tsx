import React from "react";
import "./loadingOverlay.css";
import { Portal } from "./Portal";

interface LoadingOverlayProps {
    isLoading: boolean
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
    return isLoading
        ? (
            <Portal>
                <div data-test="loading-overlay" className="loader-overlay">
                    <span className="loader" />
                </div>
            </Portal>
        ) : null
}
