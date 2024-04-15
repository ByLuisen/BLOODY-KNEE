import { Component } from '@angular/core';
import { ChatGptService } from 'src/app/chatgpt.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userInput: string = '';
  chatHistory: { text: string, sender: string }[] = [];

  constructor(private chatService: ChatGptService) { }

  sendMessage() {
    const userMessage = { text: this.userInput, sender: 'user' };
    this.chatHistory.push(userMessage);

    this.chatService.sendMessage(this.userInput).subscribe(response => {
      // Obtener la respuesta del bot
      const botMessage = { text: response.choices[0].text.trim(), sender: 'bot' };
      this.chatHistory.push(botMessage);
    }, error => {
      console.error('Error sending message:', error);
      const errorMessage = { text: 'Error al enviar el mensaje', sender: 'bot' };
      this.chatHistory.push(errorMessage);
    });

    this.userInput = ''; // Limpiar el campo de entrada después de enviar el mensaje
  }
}
