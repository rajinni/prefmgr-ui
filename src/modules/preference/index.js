import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

export const ExternalApiComponent = () => {
    const audience = 'https://richardnordstrom.com';
    const [state, setState] = useState({
        showResult: false,
        apiMessage: "",
        error: null,
    });

    const {
        getAccessTokenSilently,
        loginWithPopup,
        getAccessTokenWithPopup,
    } = useAuth0();

    const handleConsent = async () => {
        try {
            await getAccessTokenWithPopup();
            setState({
                ...state,
                error: null,
            });
        } catch (error) {
            setState({
                ...state,
                error: error.error,
            });
        }

        await callApi();
    };

    const handleLoginAgain = async () => {
        try {
            await loginWithPopup();
            setState({
                ...state,
                error: null,
            });
        } catch (error) {
            setState({
                ...state,
                error: error.error,
            });
        }

        await callApi();
    };

    const callApi = async () => {
        try {
            const token = await getAccessTokenSilently({
                audience: 'https://richardnordstrom.com'
            });

            const response = await fetch('https://prefmgrapi20220730173643.azurewebsites.net:443/api/preferenceSetting?solutionName=psyduck', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseData = await response.json();

            setState({
                ...state,
                showResult: true,
                apiMessage: responseData,
            });
        } catch (error) {
            setState({
                ...state,
                error: error.error,
            });
        }
    };

    const handle = (e, fn) => {
        e.preventDefault();
        fn();
    };

    return (
        <>
            <div className="mb-5">
                {state.error === "consent_required" && (
                    <Alert color="warning">
                        You need to{" "}
                        <a
                            href="#/"
                            class="alert-link"
                            onClick={(e) => handle(e, handleConsent)}
                        >
                            consent to get access to users api
                        </a>
                    </Alert>
                )}

                {state.error === "login_required" && (
                    <Alert color="warning">
                        You need to{" "}
                        <a
                            href="#/"
                            class="alert-link"
                            onClick={(e) => handle(e, handleLoginAgain)}
                        >
                            log in again
                        </a>
                    </Alert>
                )}


                <Button
                    color="primary"
                    className="mt-5"
                    onClick={callApi}
                    disabled={!audience}
                >
                    Get preference :D
                </Button>
            </div>

            <div className="result-block-container">
                {state.showResult && (
                    <div className="result-block" data-testid="api-result">
                        <h2 className="muted">Psyduck Preference:</h2>
                        <div>
                            <p>invertedscrolling : {state.apiMessage["game.psyduck"].preference.invertedscrolling.toString()}</p>
                            <p>screenheight : {state.apiMessage["game.psyduck"].preference.screenheight.toString()}</p>
                            <p>screenwidth : {state.apiMessage["game.psyduck"].preference.screenwidth.toString()}</p>
                            <p>greeting : {state.apiMessage["game.psyduck"].preference.greeting.toString()}</p>
                            <p>usedarkmode : {state.apiMessage["game.psyduck"].preference.usedarkmode.toString()}</p>
                        </div>

                    </div>
                )}
            </div>
        </>
    );
};


export default ExternalApiComponent;