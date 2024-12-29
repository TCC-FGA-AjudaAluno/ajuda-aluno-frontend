import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchFgaNews(){
   try {
      const response = await axios.get('https://fga.unb.br/');
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

