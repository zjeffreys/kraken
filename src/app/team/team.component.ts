import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  INVESTOR:any[]=[
    {
      'name': 'TBD', 
      'price': '500', 
    }, 
    {
      'name': 'TBD', 
      'price': '500', 
    }, 
    {
      'name': 'TBD', 
      'price': '500', 
    }, 
    {
      'name': 'TBD', 
      'price': '500', 
    }, 
    {
      'name': 'TBD', 
      'price': '500', 
    }, 
    {
      'name': 'TBD', 
      'price': '500', 
    }
  ]
  TEAM: any[] = [
    {
      'name': 'Zachary Jeffreys', 
      'profile_img': '/assets/img/meNBuddah.jpg',
      'title': 'Developer & Data Scientist', 
      'kraken_imgs': ['/assets/img/kraken_lava.png'], 
      'contact': 'zjeffreys@seattleu.edu', 
      'requirements': '',
    }, 
    {
      'name': 'Nichalos Jeffreys', 
      'profile_img': 'https://media-exp1.licdn.com/dms/image/C5603AQGo8Kr9e1Btjw/profile-displayphoto-shrink_200_200/0/1568095097522?e=1647475200&v=beta&t=KfSKesInJbx93U6ke6Xkafle3-_oX7VaR1OHmWelGJQ',
      'title': 'TBD', 
      'kraken_imgs': ['/assets/img/kraken_posiden.png'], 
      'contact': '253-905-2653', 
      'requirements': '', 
    },  
    {
      'name': 'TBD', 
      'profile_img': '/assets/img/Level.png',
      'title': 'Discord Manager', 
      'kraken_imgs': ['/assets/img/kraken_posiden.png'], 
      'contact': '', 
      'requirements' : [
        "Grow discord to 4,000 members 2 months",
        "Grow Instagram to 2,000 members", 
        "Communicate daily to engage community", 
        "$500 Buy In"
      
      ], 
      'reward': '1 X Supreme God Package', 
    },  
    {
      'name': 'TBD', 
      'profile_img': '/assets/img/Level.png',
      'title': 'Blockchain/Full-Stack Developer', 
      'kraken_imgs': ['/assets/img/kraken_posiden.png'], 
      'contact': '', 
      'requirements' : [
        "Help to build & test application",
        "Deploy smart contracts", 
        "$500 Buy In"
      
      ], 
      'reward': '1 X Supreme God Package', 
    },   
     {
      'name': 'TBD', 
      'profile_img': '/assets/img/Level.png',
      'title': 'Content Creator', 
      'kraken_imgs': ['/assets/img/kraken_posiden.png'], 
      'contact': '', 
      'requirements' : [
        "Create new content daily. Video, pictures, etc.", 
        "Work with Social Media Manager ", 
        "$500 Buy In"
      ], 
      'reward': '1 X Supreme God Package', 
    },  
    {
      'name': 'TBD', 
      'profile_img': '/assets/img/Level.png',
      'title': 'Funding Manager', 
      'kraken_imgs': ['/assets/img/kraken_posiden.png'], 
      'contact': '', 
      'requirements' : [
        "Sit and meet with potential investors ",
        "Obtain 10,000 funding", 
        "$500 Buy In"
      ], 
      'reward': '1 X Supreme God Package', 
    },
    
  ]
  constructor() {
   
   }

  ngOnInit(): void {
  }

}
