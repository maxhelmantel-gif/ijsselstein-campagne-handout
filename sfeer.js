function makeSfeerPrompt(feeling, cues) {
  const context = feeling.trim();
  if (!context) return '';
  return `R — Rol\nJe bent een artdirector en fotograaf met een artistieke blik.\n\nC — Context\nHet gewenste gevoel is: ${context}.${cues.trim() ? ` Visuele richting: ${cues.trim()}.` : ''}\n\nT — Taak\nMaak één artistiek sfeerbeeld dat dit gevoel oproept. Vertaal het naar licht, kleur en textuur; laat ruimte voor een eigen visuele interpretatie. Nog geen product, tekst of logo.\n\nF — Format\nEén samenhangend, vierkant beeld. Geen collage of uitgewerkte advertentie.`;
}
const form = document.querySelector('#sfeer-form');
const output = document.querySelector('#sfeer-prompt');
const status = document.querySelector('#prompt-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  const feeling = form.elements.feeling;
  feeling.setCustomValidity(feeling.value.trim() ? '' : 'Vul een gevoel in.');
  if (!form.reportValidity()) return;
  output.value = makeSfeerPrompt(feeling.value, form.elements.cues.value);
  document.querySelector('#prompt-empty').hidden = true;
  document.querySelector('#prompt-result').hidden = false;
  status.textContent = 'Je sfeerprompt is klaar.';
});
form.elements.feeling.addEventListener('input', () => form.elements.feeling.setCustomValidity(''));
form.addEventListener('input', () => {
  if (!document.querySelector('#prompt-result').hidden) {
    document.querySelector('#prompt-result').hidden = true;
    document.querySelector('#prompt-empty').hidden = false;
    status.textContent = 'Maak je prompt opnieuw om je wijzigingen mee te nemen.';
  }
});
document.querySelector('#copy-prompt').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    status.textContent = 'Gekopieerd. Je kunt de prompt nu in Gemini plakken.';
  } catch {
    output.focus(); output.select();
    status.textContent = 'Kopiëren lukte niet automatisch. De prompt is geselecteerd; kopieer de tekst zelf.';
  }
});
