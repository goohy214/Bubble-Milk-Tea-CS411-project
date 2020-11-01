import React from 'react';
import {Link } from "react-router-dom";

 function Home() {
     return (
       <div>
         <p>
           Pretend it's a home page.
           <br />
            I wanna end my life.
         </p>
         <Link to="/login"><button>
           Sign up n stuff
         </button>
         </Link>
       </div>
     );

 }

 export default Home;