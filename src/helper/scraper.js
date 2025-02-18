import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchFgaNews(){
   try {
      const response = await axios.get('https://fcte.unb.br/');
      const $ = cheerio.load(response.data);
      const fgaPosts = $('.eael-grid-post-link').map((_, posts) => {
         return posts.attribs;
      })
      .toArray();
   
      return fgaPosts;
  } catch (error) {
      return { error : "Could not fetch data news from website"}
  }
}

export async function fetchSemesterDuration(){
   try {
      var currentYearSemesters = [];
      var semesterDuration = 0;
      var currentYear = new Date().getFullYear();
      const currentDate = new Date().getTime();
      /*
      const response = await axios.get('https://saa.unb.br/graduacao/calendario-academico');
      const $ = cheerio.load(response.data);
      $(`#periodos-letivos-de-${currentYear} tbody tr`).toArray()
      .forEach((key, index) => {
         if (index === 1 || index === 2) {
            //currentYearSemesters.push(key.children[3].children[0].data);
            console.log('currentYearSemesters: ', key.children[5].children[0].data);
            currentYearSemesters.push(key.children[5].children[0].data);
         }
      });
      */

      currentYearSemesters.push('26/07/2025');

      if(currentDate < formatDate(currentYearSemesters[0])){
         semesterDuration = convertMilisecondsToDays(formatDate(currentYearSemesters[0]) - currentDate);
         return semesterDuration
      }else{
         semesterDuration = convertMilisecondsToDays(formatDate(currentYearSemesters[1]) - currentDate);
         return semesterDuration
      }
  } catch (error) {
      return { error : "Error getting semester duration"}
  }
}

function formatDate(date){
   var parts = date.split("/");
   return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
}

function convertMilisecondsToDays(miliseconds) {
   var days,total_hours, total_minutes, total_seconds;
  
   total_seconds = parseInt(Math.floor(miliseconds / 1000));
   total_minutes = parseInt(Math.floor(total_seconds / 60));
   total_hours = parseInt(Math.floor(total_minutes / 60));
   days = parseInt(Math.floor(total_hours / 24));
   
   return days;
}

