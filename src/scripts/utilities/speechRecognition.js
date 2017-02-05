import Promise from 'bluebird';

/**
 * @name PHRASES
 * @type {[*]}
 */
const PHRASES = [
    'hello',
    'bank',
    'status',
    'balance',
    'transfers'
];

const GRAMMAR = `#JSGF V1.0; grammar phrases; public <phrase> =  ${PHRASES.join(' | ')};`;

export default function recognition() {
    return new Promise((resolve) => {
        let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
        let speechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

        let recognition = new speechRecognition();
        let recognitionList = new speechGrammarList();
        recognitionList.addFromString(GRAMMAR, 1);

        recognition.grammars = recognitionList;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = event => {
            console.log('recognition event', event);
            resolve();
        };

        recognition.onspeechend = () => {
            recognition.stop();
            console.log('ended');
            resolve();
        };

        recognition.onnomatch = function(event) {
            console.log("I did not recognise that.");
            resolve();
        };

        console.log('starting recognition');
    });
}
