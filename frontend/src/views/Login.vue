<template>
  <div class="login hero min-h-screen bg-base-200">
    <div class="login-content text-center hero-content rounded-box">
      <div class="max-w-md">
        <h1 class="mb-7 text-4xl font-bold">Connexion</h1>
        <p class="mb-5">
            Connectez vous avec votre compte Google ou Github
        </p>
        <a class="mb-5 google-btn btn rounded-full btn-block btn-outline" href='http://localhost:3030/oauth/google'>
            <img class="mr-5" src="../assets/Google__G__Logo.svg" alt="">
            Sign in with Google</a>
        <a class="mb-5 github-btn btn rounded-full btn-block btn-outline" href='http://localhost:3030/oauth/github'>
            <img class="mr-5" src="../assets/GitHub-Mark-32px.png" alt="">
            <span class=text-github-btn>Sign in with Github</span></a>

      </div>
    </div>
  </div>
</template>
<script>
export default {};

</script>
<style scoped>

.login{
    background-color: #EEE; 
}

.login-content{
    background-color: #FFF;
}

.google-btn{
    color: #4285f4;
}
.google-btn:hover {

    background-color: #1669F2;
    border-color: white;
}

.github-btn {
    color: #24292f;
}

.github-btn:hover {
    background-color:#24292f;
}

.github-btn:hover img{
    filter: invert(1);
}
</style>
