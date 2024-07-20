// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Graphs and Comparison</title>
//     <style>
//         /* CSS */
//         body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             background: #f4f4f4;
//         }

//         .navbar {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             padding: 10px 20px;
//             background-color: rgba(255, 159, 64, 1);
//             color: white;
//         }

//         .navbar a {
//             color: white;
//             text-decoration: none;
//             margin-right: 15px;
//         }

//         .navbar button {
//             background: white;
//             border: none;
//             padding: 10px 20px;
//             cursor: pointer;
//             border-radius: 5px;
//         }

//         .background-animation {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: linear-gradient(135deg, #ff9f40, #ff6347);
//             background-size: 400% 400%;
//             animation: gradientAnimation 15s ease infinite;
//             z-index: -1;
//         }

//         @keyframes gradientAnimation {
//             0% {
//                 background-position: 0% 50%;
//             }
//             50% {
//                 background-position: 100% 50%;
//             }
//             100% {
//                 background-position: 0% 50%;
//             }
//         }

//         h1 {
//             text-align: center;
//             margin-top: 50px;
//             color: rgba(255, 159, 64, 1);
//         }

//         .ranking-table {
//             width: 80%;
//             margin: 50px auto;
//             box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//             border-radius: 10px;
//             overflow: hidden;
//         }

//         .ranking-table table {
//             width: 100%;
//             /* border-collapse: collapse; */
//         }

//         .ranking-table th, .ranking-table td {
//             border: 1px solid #ddd;
//             padding: 12px 15px;
//             text-align: left;
//         }

//         .ranking-table th {
//             background-color:rgba(255, 159, 64, 1);
//             color: white;
//             font-weight: bold;
//         }

//         .ranking-table td {
//             background-color: #ffffff;
//         }

//         .ranking-table tr:nth-child(even) {
//             background-color: #f9f9f9;
//         }

//         .ranking-table tr:hover {
//             background-color: #f1f1f1;
//         }

//         .fade-in {
//             opacity: 0;
//             animation: fadeIn 2s forwards;
//         }

//         @keyframes fadeIn {
//             to {
//                 opacity: 1;
//             }
//         }
//     </style>
// </head>
// <body>
   
//     <div class="background-animation"></div>
//     <h1>Graphs and Comparison</h1>
    
//     <div class="ranking-table">
//         <table>
//             <thead>
//                 <tr>
//                     <th style="border-top-left-radius:15px">Rank</th>
//                     <th>Username</th>
//                     <th style="border-top-right-radius:15px">Rating</th>
//                 </tr>
//             </thead>
//             <tbody id="ranking-body">
//                 <tr class="fade-in">
//                     <td>1</td>
//                     <td>User1</td>
//                     <td>3000</td>
//                 </tr>
//                 <tr class="fade-in">
//                     <td>2</td>
//                     <td>User2</td>
//                     <td>2800</td>
//                 </tr>
//                 <tr class="fade-in">
//                     <td>3</td>
//                     <td>User3</td>
//                     <td>2700</td>
//                 </tr>
//                 <!-- Add more rows as needed -->
//             </tbody>
//         </table>
//     </div>

//     <script>
//         // JavaScript
//         document.addEventListener('DOMContentLoaded', () => {
//             const rows = document.querySelectorAll('#ranking-body tr');
//             rows.forEach((row, index) => {
//                 setTimeout(() => {
//                     row.style.opacity = 1;
//                 }, index * 200);
//             });
//         });
//     </script>
// </body>
// </html>
