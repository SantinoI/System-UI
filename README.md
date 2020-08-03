# System-UI

System UI offre all’utente la possibilità di analizzare il comportamento di vari sistemi, senza doversi curare della loro implementazione.

Per prima cosa l’utente deve scegliere quale tipologia di sistema simulare. Una volta scelto, sulla sinistra potrà settare le variabili di controllo per ciascun sistema (y’’ =0/1 ), durata e input della simulazione.
Ogni sistema è implementato come un modulo a se stante, il che permette di implementare nuove tipologie di sistemi in caso di sviluppi futuri

# Scelta dei controllori
Per l’utente sarà inoltre possibile, opzionalmente, scegliere di aggiungere un controllore. Le opzioni attualmente disponibili sono : PI, PI con saturazione, PID e PID
con saturazione.
Sarà inoltre possibile settare una propria funzione di riferimento, scegliendo fino a 4 condizioni differenti (if elif).



# Analisi degli Output
Dopo il tempo necessario per la simulazione, il tool mostrerà un report nel quale è possibile apprezzare sulla sinistra il grafico del sistema complessivo, mentre sulla
destra una sintesi dettagliata di ogni sistema comprensiva di autovalori e stabilità.

Per eseguire il server Flusk, è necessario impostare un timeout >= 90. Tramite il seguente comando:
```sh
$ gunicorn3 app:app --timeout 90
```


![System-UI](https://i.ibb.co/ng1nmKC/Cattura.jpg)
