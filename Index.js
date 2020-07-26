    let addBtn=document.getElementById("add_movie_btn");
let backDrop=document.querySelector(".backdrop");
let addMovieModal=document.getElementById("add_movie"); 
let deleteMovieModal=document.getElementById("delete-modal");
let titleInput=document.getElementById("title");
let ratingInput=document.getElementById("rating");
let addModalCancelBtn=document.querySelector(".add_modal_cancelBtn");
let addModalAddBtn=document.querySelector(".add_modal_addBtn");
const entryText=document.getElementById("entry-text")
const movies=[];



const toggleBackdrop=()=>backDrop.classList.toggle("visible")
const toggleAddMoveModal=()=>addMovieModal.classList.toggle("visible")

// Header ADD MOVIE BUTTON EVENT
addBtn.addEventListener("click",()=>{
    toggleBackdrop()
    toggleAddMoveModal()       
        }) 



// BACKDROP EVENT
backDrop.addEventListener("click",()=>{
    toggleBackdrop();
    addMovieModal.classList.remove("visible")
    deleteMovieModal.classList.remove("visible");
})

// ADD MOVIE MODEL CANCEL BUTTON EVENT  
addModalCancelBtn.addEventListener("click",()=>{
    toggleBackdrop()
    toggleAddMoveModal()
})

// CLEAR INPUTS
const clearInputs=()=>{
    titleInput.value="";
    ratingInput.value=""
}

const cancelDeletion=()=>{
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible")
}

const deleteMovie=(id)=>{
   let Index=movies.findIndex(film=>film.id==id);
   movies.splice(Index,1);
   let movieList=document.querySelector(".movie_List");
   movieList.removeChild(movieList.children[Index])
  toggleBackdrop();
deleteMovieModal.classList.remove("visible");
if(movies.length===0){
  entryText.style.display="block";
}else{
  entryText.style.display="none";
}
}

const readyToDelete=id=>{
   deleteMovieModal.classList.add("visible");
   toggleBackdrop();
   let deleteModalCancelBtn=document.querySelector(".delete_modal_cancelBtn");
  //  Old Refference of deleteModalYesBtn
   let deleteModalYesBtn=document.querySelector(".delete_model_yesBtn");
  //  deleteModalYesBtn reference changed therefor after we apply replaceWith method-
  //  So,we have to target correct refference which we get after replaceWith method-
  // cloning will also remove all eventListener As Well
   deleteModalYesBtn.replaceWith(deleteModalYesBtn.cloneNode(true));
   deleteModalYesBtn=document.querySelector(".delete_model_yesBtn");
   deleteModalCancelBtn.removeEventListener("click",cancelDeletion)
   deleteModalCancelBtn.addEventListener("click",cancelDeletion);
   deleteModalYesBtn.addEventListener("click",deleteMovie.bind(null,id))
}

const renderNewElement=(id,title,rating)=>{
  const movieList=document.querySelector(".movie_List");
  let newMovie=document.createElement("li");
  newMovie.className="movie_element";
  newMovie.innerHTML=`<div>
  <h3>${title}</h3>
  <h2>${rating}</h2>
  </div>`
  movieList.appendChild(newMovie);
  newMovie.addEventListener("click",readyToDelete.bind(null,id))
}

// ADD MOVIE MODEL ADD BUTTON EVENT
addModalAddBtn.addEventListener("click",()=>{
  if(titleInput.value.trim()===""||ratingInput.value.trim()===""||+ratingInput.value<=0 || +ratingInput.value>5){
     alert("Please Check Your Inputs-Provide Valid Inputs");
     return;
  }
  const movie={
      id:Math.random(),
      title:titleInput.value.trim(),
      rating:ratingInput.value.trim()
  }
  movies.push(movie);
  clearInputs();
  toggleAddMoveModal();
  toggleBackdrop();
  renderNewElement(movie.id,movie.title,movie.rating);
  if(movies.length===0){
    entryText.style.display="block";
  }else{
    entryText.style.display="none";
  }

})