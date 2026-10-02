'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('js-motion');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
}
const command = document.querySelector('#terminal-command');
const terminalStatus = document.querySelector('#terminal-status');
const commands = [['understand()', '// a good place to start'], ['architect()', '// complexity, gently untangled'], ['mentor()', '// better together'], ['ship()', '// production: purrfect'], ['nap()', '// CEO temporarily unavailable']];
let commandIndex = 0, typingTimer, commandTimer, treating = false;
function typeCommand(value) {
  clearTimeout(typingTimer); let index = 0; command.textContent = '';
  function type() { command.textContent = value.slice(0, ++index); if (index < value.length) typingTimer = setTimeout(type, 75); }
  type();
}
function scheduleTerminal() {
  clearTimeout(commandTimer);
  if (reducedMotion.matches || document.hidden || treating) return;
  commandTimer = setTimeout(() => { commandIndex = (commandIndex + 1) % commands.length; typeCommand(commands[commandIndex][0]); terminalStatus.textContent = commands[commandIndex][1]; scheduleTerminal(); }, 3400);
}
scheduleTerminal();
document.addEventListener('visibilitychange', () => { if (document.hidden) { clearTimeout(commandTimer); clearTimeout(typingTimer); } else scheduleTerminal(); });
const treatButton = document.querySelector('#treat-button');
const feedback = document.querySelector('#treat-feedback');
const ceo = document.querySelector('.ceo-image');
let treats = 0;
treatButton.addEventListener('click', () => {
  treats++; treating = true; treatButton.disabled = true; clearTimeout(commandTimer); clearTimeout(typingTimer);
  command.textContent = 'sudo give-nozomi-treat'; terminalStatus.textContent = '// approved. carry on, human.';
  feedback.textContent = ['Prrrr. Your proposal has been approved.', 'A second treat? Promoted to favorite human.', 'The CEO would like to extend this engagement.'][Math.min(treats - 1, 2)];
  if (!reducedMotion.matches) {
    ceo.classList.add('happy'); const box = treatButton.getBoundingClientRect();
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('span'); particle.className = 'treat-particle'; particle.textContent = i % 3 === 0 ? '✦' : '♥';
      particle.style.left = `${box.left + box.width / 2}px`; particle.style.top = `${box.top + box.height / 2}px`; particle.style.color = i % 2 ? '#bd552f' : '#728453';
      particle.style.setProperty('--dx', `${(Math.random() - .5) * 380}px`); particle.style.setProperty('--dy', `${-80 - Math.random() * 220}px`); particle.style.setProperty('--spin', `${(Math.random() - .5) * 180}deg`);
      document.querySelector('#treat-particles').appendChild(particle); particle.addEventListener('animationend', () => particle.remove(), { once: true });
    }
  }
  setTimeout(() => { ceo.classList.remove('happy'); treatButton.disabled = false; treating = false; scheduleTerminal(); }, 1800);
});
let logoClicks = 0, logoClickTimer;
document.querySelector('.brand').addEventListener('click', () => {
  clearTimeout(logoClickTimer); logoClicks++; logoClickTimer = setTimeout(() => { logoClicks = 0; }, 5000);
  if (logoClicks === 5) { document.body.classList.toggle('cat-mode'); document.querySelector('.hero-scribble').textContent = document.body.classList.contains('cat-mode') ? 'sudo make-me-a-cat' : 'Yes, she’s in charge.'; logoClicks = 0; }
});
document.querySelector('#year').textContent = new Date().getFullYear();
