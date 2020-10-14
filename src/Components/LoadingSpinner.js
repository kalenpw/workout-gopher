import React from 'react';
import 'CSS/spinner.css';

export default function LoadingSpiner() {
    return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <div className="spinner"></div>
            </div>
        </div>
    );
}