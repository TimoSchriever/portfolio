export default class FallingStars {
  constructor() {
    this.Left = `${Math.random() * 20 + 80}%`; // Random between 80 and 100
    this.Top = '-10px'; // Start from the top
    this.Opacity = Math.random();
    this.AnimationDuration = `${Math.random() * 5 + 3}s`; // Random duration between 3 and 8 seconds
    this.AnimationDelay = `${Math.random() * 20}s`; // Random delay for variation
  }

  generateNewStar() {
    this.Left = `${Math.random() * 20 + 80}%`; // Random between 80 and 100
    this.Top = '-10px'; // Reset to top position
    this.Opacity = Math.random();
    this.AnimationDuration = `${Math.random() * 3 + 1}s`; // Random duration between 3 and 8 seconds
    this.AnimationDelay = `${Math.random() * 20}s`; // Random delay for variation
  }
}