<template>
   <div class="cat__tounge bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-400 hover:border-blue-500">
      <i class="text-white fab fa-facebook-f"></i>
      <i class="text-white  fab fa-twitter"></i>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.cat__tounge{
  display: flex;
  align-items: center;
  position: fixed;
  background: #63B3ED;
  justify-content: center;
  border-radius: 10px;
  right: -145px;
  padding-left: 20px;
  width: 190px;
  cursor: pointer;
  height: 95px;
  transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
}

.cat__tounge>i{
  margin: 0 5px;
}


.cat__tounge:hover{
  right: -50px;
  box-shadow: 0 0 25px 0 rgba(0,0,0,.04);
  transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
}
@media only screen and (max-width: 600px) {
    .cat__tounge{
        display:none;
    }
}
</style>