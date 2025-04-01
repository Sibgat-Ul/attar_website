<template>
    <div>
      <h2>Google Sheets Data</h2>
      <ul>
        <li v-for="(row, index) in sheetData" :key="index">
          {{ row.join(' | ') }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        sheetData: [],
      };
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:3000/data');
        this.sheetData = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  };
  </script>
  