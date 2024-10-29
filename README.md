# F1 Drivers App

Who doesn't like trivia? My group of university mates often talk about Formula 1 (F1)! It is something that we follow up regularly, and we would make an effort to make time to attend the Singapore Grand Prix together! During our meetups, when ever we would talk about F1, we will discuss about the drivers too. So I figured, why not have an app where we could look up driver's information on the go, and do some fact checks as well. I believe this would be a fun app to use, and I have created a section, where you can save some of your favourite drivers for quick access to their profile and details.

```
“We win and lose together.” – Lewis Hamilton.
```

# Getting started

After cloning the repo to your computer, you will need to create a .env file in your root folder. Create a VITE_TOKEN=abc, where abc is your airtable Personal access token. This is because there are fields which needs authorisation in order for them to function correctly.

Next, you would need to create an airtable with the following parameters:-

- airtable with 6 columns
- columns to be set up as single line text fields.
- column labels from left to right; driverId, givenName, familyName, dateOfBirth, nationality, url

Finally, ensure you are at the main folder of this file, using gitbash,key 'npm run dev' to try out the application on your web browser. I would recommend to use the chrome browser, as the application was created and tested on chrome.

# Attributions

For designs, I have used bootstrap for the buttons, and the overall html styling:-

- [Bootstrap](https://getbootstrap.com/)

Images are obtained from these sites:- -[Formula 1](https://www.formula1.com/en/latest/article/driver-of-the-day-2024.1I7A0iPl3nMaXyPIeFVFLZ)

Whenever I got stuck, or faced difficulties in implementing the codes or ideas, I would refer to the following for examples and write ups:-

- [W3Schools](https://www.w3schools.com/)
- [MDN](https://developer.mozilla.org/en-US/)
- [General Assembly Course Notes](https://generalassemb.ly/)
- [React](https://react.dev/learn)

# Technologies Used

1. HTML
1. CSS
1. JavaScript
1. React
1. Visual Studio
1. Github
1. Chrome
1. Bootstrap
1. Airtable
1. Trello
1. Wireframe.cc

# Next Steps

Next steps: Planned future enhancements (stretch goals).

- Add more filters to show active drivers for different season
- Add a schedule of the current season
- Add race results
