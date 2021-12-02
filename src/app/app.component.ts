import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core/testing';
import { ChatSupportService } from './Service/chat-support.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isShowArticle: boolean = false;
  showLoader: boolean = false;
  title = 'chatbot-inventoryahead';
  theHtmlString: string = "";
  Conversation: any = [

  ];
  message: any = "";
  userQueryData: any = "";
  userQueryLink: any = [];

  constructor(@Inject(DOCUMENT) private document: Document, public _ChatSupportService: ChatSupportService) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.Conversation.push(
        {
          text: "Hi, Welcome to Inventory Ahead!",
          sendBy: "Server"
        }
      )
    }, 1500);
    setTimeout(() => {
      this.Conversation.push(
        {
          text: "Ask me a question & I will find answer for you",
          sendBy: "Server"
        }
      )
    }, 2500);

  }

  addMessageToConversation() {
    let messageText = this.message;
    if (messageText.trim().length == 0) {
    }
    else {
      let message = {
        text: messageText,
        sendBy: "User"
      }
      this.Conversation.push(message)
      this.message = ""

      setTimeout(() => {
        var resByServer = {
          text: "...",
          sendBy: "Server"
        }
        this.Conversation.push(resByServer)
      }, 100);

      this._ChatSupportService.getChatSupport(this.message).subscribe(
        data => {
          console.log(data)
          this.userQueryData = data.toString();
          console.log(this.userQueryData)
          this.userQueryLink = this.userQueryData.match(/href="([^"]*)/g)
          console.log(this.userQueryLink)
          for (var i = 0; i < this.userQueryLink.length; i++) {
            this.userQueryLink[i] = this.userQueryLink[i].replace('href="', "");
          }
          this.Conversation[this.Conversation.length - 1] = {
            text: "Here are the results for your search",
            sendBy: "Server"
          }
          this.showResults()
          console.log(this.userQueryLink)
        }
      );

    }

  }

  showResults() {
    var resResult: any = {};
    for (var i = 0; i < this.userQueryLink.length; i++) {
      resResult = {
        sendBy: "Result",
        text: this.userQueryLink[i].replace('https://faq.inventoryahead.com/article/', "").replace(/-/g, " ").replace("/", ""),
        link: this.userQueryLink[i]
      }
      this.Conversation.push(resResult)
    }
    console.log(this.Conversation)
  }

  showArticle(e: any) {
    this.showLoader = true
    if (e.sendBy == "Result") {
      this._ChatSupportService.getArticle(e.link).subscribe(
        data => {
          this.theHtmlString = data.toString().slice(data.toString().indexOf('<section id="content"'), data.toString().indexOf('</section>') + 10)
          this.isShowArticle = true
          this.showLoader = false
        })
    }
  }

  goBack() {
    this.isShowArticle = false
  }

}
