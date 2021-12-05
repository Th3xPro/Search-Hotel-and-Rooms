# Table of contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Quick Look Inside](#quick-look-inside)
* [Learn More](#learn-more)

## General Info
This React application was created to display hotels with their rooms and ability to filter them by 
 - Rating of hotel
 - Number of Adults and Children

## Technologies

Project is created with:
* axios: 0.24.0,
* react-bootstrap: 2.0.3,
* react-simple-image-slider: 2.3.0,

## Setup
To run this project, install it locally using npm:

```
npm install
npm start
```
OR

```
npm i axios react-bootstrap
npm install react-simple-image-slider --save
npm start
```

## Quick Look Inside

![image](https://user-images.githubusercontent.com/42244290/144750611-2ba781c6-d3c7-4be4-a5e0-3aec9ea90303.png)

## Learn More

<i>Problems I had ?</i>

The main one was I wanted to create the project in single file to make it the simplest as it can be. </br>
So I ended up fetching hotels from first API and in the same time passing ID's from first call to second to fetch rooms and somehow combine them in together. </br>
<i>It got me into a loop of problems unable to be solved by me</i> </br>
But then I got an idea to pass the data to another component and fetch it inside him. </br>
The rest was just basic styling and basic filtering by the user input.

