"use client";

import { useState } from 'react';

const domande = [
  "Mi sento sopraffatto(a) dalle responsabilità quotidiane e sento di essere vicino(a) al limite.",
  "Ho difficoltà a rilassarmi o a staccare dopo una giornata intensa di lavoro.",
  "Mi sento costantemente stanco(a), anche dopo periodi di riposo o sonno adeguato.",
  "Ho notato cambiamenti nel mio umore, come frequente irritabilità o impazienza, anche in situazioni banali.",
  "Ho notato un calo significativo della mia produttività, concentrazione o motivazione nelle attività quotidiane.",
  "Recentemente ho pensato o desiderato di abbandonare improvvisamente tutto a causa della pressione o dello stress intenso che sto vivendo.", // FLAG
  "Provo disturbi fisici come dolori muscolari, mal di testa o problemi digestivi senza una causa medica apparente.",
  "La mia vita sociale, familiare o affettiva è compromessa dal mio attuale livello di stress.",
  "Provo tensione o ansia pensando alle attività o compiti in sospeso che non riesco ancora a completare.",
  "Ho difficoltà nel prendere decisioni semplici, sentendomi spesso indeciso(a) o confuso(a)."
];

export default function TestStress() {
  const [risposte, setRisposte] = useState(Array(10).fill(0));
  const [risultato, setRisultato] = useState(null);
  const [indiceAttuale, setIndiceAttuale] = useState(0);

  const registraRisposta = (valore) => {
    const nuoveRisposte = [...risposte];
    nuoveRisposte[indiceAttuale] = valore;
    setRisposte(nuoveRisposte);

    if (indiceAttuale < domande.length - 1) {
      setIndiceAttuale(indiceAttuale + 1);
    } else {
      calcolaRisultato(nuoveRisposte);
    }
  };

  const calcolaRisultato = (risposte) => {
    if (risposte[5] >= 3) { // FLAG
      setRisultato("ROSSO");
    } else {
      const somma = risposte.reduce((a, b) => a + b, 0);
      if (somma <= 20) setRisultato("VERDE");
      else if (somma <= 35) setRisultato("GIALLO");
      else setRisultato("ROSSO");
    }
  };

  const riavviaTest = () => {
    setRisposte(Array(10).fill(0));
    setRisultato(null);
    setIndiceAttuale(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!risultato ? (
        <>
          <h2 className="text-xl font-semibold mb-4">{`Test dello Stress`}</h2>
          <p className="mb-4">{domande[indiceAttuale]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registraRisposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Domanda {indiceAttuale + 1} di {domande.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">Risultato: {risultato}</h2>
          <img
            src={
              risultato === "VERDE"
                ? "/images/semaforo-verde.png"
                : risultato === "GIALLO"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`Semaforo: ${risultato}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {risultato === "VERDE" && (
            <p className="text-center">Gestisci molto bene questo aspetto e sei emotivamente equilibrato(a). Potrai essere di grande aiuto ad altre persone che necessitano sostegno.</p>
          )}
          {risultato === "GIALLO" && (
            <p className="text-center">Ci sono chiari segnali di difficoltà emotive che richiedono attenzione e che, con determinazione e aiuto, possono essere superati.</p>
          )}
          {risultato === "ROSSO" && (
            <p className="text-center">I tuoi problemi emotivi legati a questo tema richiedono necessariamente l'intervento di un professionista. Ti consigliamo di cercare rapidamente l'aiuto di un medico o psicologo.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={riavviaTest}
          >
            Ripeti il test
          </button>
    
        </>
      )}
    </div>
  );
}
