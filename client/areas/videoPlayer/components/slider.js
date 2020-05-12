
import styled from 'styled-components';
export const VolumeSlider = styled.input`
-webkit-appearance:none; 
background: #7b7b7b33; 
border:0; 
border-radius:26px; 
color: #00b3ff; 
display:block; 
height:5px; 
margin:0; 
padding:0; 
transition:box-shadow .3s ease; 
width:100%; 


&::-webkit-slider-runnable-track {
   background: 0 0;
   border: 0;
   border-radius: 2.5px;
   height: 5px;
   transition: box-shadow .3s ease;
   -webkit-user-select: none;
   user-select: none;
   background-image: linear-gradient(to right,red 100,transparent 100);
}

&::-webkit-slider-thumb {
   background: #fff;
   border: 0;
   border-radius: 100%;
   box-shadow: 0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(35,41,47,.2);
   height: 13px;
   position: relative;
   transition: all .2s ease;
   width: 13px;
   -webkit-appearance: none;
   margin-top: -4px;
}

&::-moz-range-track {
   background: 0 0;
   border: 0;
   border-radius: 2.5px;
   height: 5px;
   transition: box-shadow .3s ease;
   -moz-user-select: none;
   user-select: none;
}

&::-moz-range-thumb {
   background: #fff;
   border: 0;
   border-radius: 100%;
   box-shadow: 0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(35,41,47,.2);
   height: 13px;
   position: relative;
   transition: all .2s ease;
   width: 13px;
}

&::-moz-range-progress {
   background: red;
   border-radius: 2.5px;
   height: 5px;
}

&::-ms-track {
   background: 0 0;
   border: 0;
   border-radius: 2.5px;
   height: 5px;
   transition: box-shadow .3s ease;
   -ms-user-select: none;
   user-select: none;
   color: transparent;
}

&::-ms-fill-upper {
   background: 0 0;
   border: 0;
   border-radius: 2.5px;
   height: 5px;
   transition: box-shadow .3s ease;
   -ms-user-select: none;
   user-select: none;
}

&::-ms-fill-lower {
   background: 0 0;
   border: 0;
   border-radius: 2.5px;
   height: 5px;
   transition: box-shadow .3s ease;
   -ms-user-select: none;
   user-select: none;
   background: red;
}

&::-ms-thumb {
   background: #fff;
   border: 0;
   border-radius: 100%;
   box-shadow: 0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(35,41,47,.2);
   height: 13px;
   position: relative;
   transition: all .2s ease;
   width: 13px;
   margin-top: 0;
}

&::-ms-tooltip {
   display: none;
}

&:focus {
   outline: 0;
}

&::-moz-focus-outer {
   border: 0;
}

&.plyr__tab-focus::-webkit-slider-runnable-track {
   box-shadow: 0 0 0 5px rgba(0,179,255,.5);
   outline: 0;
}

&.plyr__tab-focus::-moz-range-track {
   box-shadow: 0 0 0 5px rgba(0,179,255,.5);
   outline: 0;
}

&.plyr__tab-focus::-ms-track {
   box-shadow: 0 0 0 5px rgba(0,179,255,.5);
   outline: 0;
}	
`;