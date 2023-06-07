<style>
    /* Three image containers (use 25% for four, and 50% for two, etc) */
    .column {
      float: left;
      width: 33.33%;
      padding: 5px;
    }
    /* Clear floats after image containers */
    .row::after {
      content: "";
      clear: both;
      display: table;
    }
    .row {
      display: flex;
    }
    .column {
      flex: 33.33%;
      padding: 5px;
    }
    /* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 500px) {
      .column {
        width: 100%;
      }
    }
</style>
  
<div style="margin-top: 40px" >
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <!--form signin-->
            <input type="submit" class="fadeIn fourth" value="Log In">
            <div class="wrapper fadeInDown" style="margin-top: 20px">
                <a href="'signup'" class="fadeIn fourth" >
                    <button class="btn btn-success">Sign Up</button>
                </a>
            </div>
        </div>
        <div class="wrapper fadeIn fourth">
            <div class="row">
                <div class="column">
                <!--'img/soccer_performance.jpeg'-->
                <img class="img-responsive" src="" alt="" style="width:100%">
                </div>
                <div class="column">
                <!--'img/swimming_performance.jpg'-->
                <img class="img-responsive" src="" alt="" style="width:100%">
                </div>
            </div>
        </div>
    </div>
</div>
