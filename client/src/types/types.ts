// src/types/types.ts

// Définitions des types pour les questions et réponses

export interface Answer {
  answer_id: number; // L'ID unique de la réponse
  question_id: number; // L'ID de la question associée
  answer_text: string; // Le texte de la réponse
  is_correct: boolean; // Si la réponse est correcte
}

export interface Question {
  question_id: number; // L'ID unique de la question
  question_text: string; // Le texte de la question
  answers: Answer[]; // Les réponses possibles pour cette question
}
