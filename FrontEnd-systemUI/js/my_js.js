

(function ($) {

  $("#spinner").hide();
  "use strict"; // Start of use strict
  $("#the_chart").hide();
  $("#information").hide();
  $('#image_cont').hide()
  $("#show_image_selector").click(function () {
    $('#image_cont').toggle()
    $("#selectImage").imagepicker({
      hide_select: false
    });

    var $container = $('.image_picker_selector');
    // initialize
    $container.imagesLoaded(function () {
      /*       $container.masonry({
              columnWidth: 30,
              itemSelector: '.thumbnail'
            }); */
    });
  });

  var time_chat = []
  var output_char = []


  $("#select_ref").on('change', function () {    // 2nd (A)
    var selectedOptionVal = $('#select_ref').find(":selected").val();
    $("#ref_container").empty();
    console.log(selectedOptionVal)
    for (let index = 0; index < parseInt(selectedOptionVal); index++) {
      $("#ref_container").append('<div style="display: flex"> <b style="margin-top: 4px; font-size: 16px; white-space: nowrap;">if( t</b> <select class="form-control" id="select_operations' + index + '"> <option>></option> <option><</option> <option>=</option> <option>!=</option> <option><=</option> <option>>=</option> </select> <input id="n2-' + index + '""  class="form-control bg-light border-0 small" placeholder="2" aria-label="Search" aria-describedby="basic-addon2"> <b style="margin-top: 4px; font-size: 16px; white-space: nowrap;">) return </b> <input id="return-' + index + '""  class="form-control bg-light border-0 small" placeholder="2" aria-label="Search" aria-describedby="basic-addon2"> </div>');
    }
  });

  $("#scaricamela").click(function () {

    html2canvas(document.querySelector('#the_chart')).then(function (canvas) {

      console.log(canvas);
      saveAs(canvas.toDataURL(), 'plot.png');
    });
  });
  function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);

    } else {

      window.open(uri);

    }
  }


  //$("#the_chart").hide();
  $("#selectImage").on('change', function () {    // 2nd (A)
    var selectedOptionVal = parseInt($('#select_system').find(":selected").val());
    var sel_img = parseInt($('#selectImage').find(":selected").val());
    $(".form-group").empty();
    $("#drag_cont").empty();
    for (let index = 1; index < parseInt(sel_img + 1); index++) {
      $("#system_equation").append('<b>G' + index + ':</b> <br/>');
      $("#system_equation").append('<div style="display: flex" id=container' + index + '>  </div> ')

      /*   $("#system_equation").append('  <input id=system_equation-' + index + ' type="text" class="form-control bg-light border-0 small" placeholder="y``+y`+5y = 7u" aria-label="Search" aria-describedby="basic-addon2">'); */



      $("#container" + index).append('  <input id=y-due-' + index + ' type="number" value=1 max=1 min=0 class="form-control bg-light border-0 small" placeholder="2" aria-label="Search" aria-describedby="basic-addon2">')
      $("#container" + index).append("<label>y''<label>")
      $("#container" + index).append("<label>=<label>")

      $("#container" + index).append('  <input id=y-uno-' + index + ' type="number" class="form-control bg-light border-0 small" placeholder="2" aria-label="Search" aria-describedby="basic-addon2">')
      $("#container" + index).append("<label>y'<label>")
      $("#container" + index).append('  <input id=y-' + index + ' type="number" class="form-control bg-light border-0 small" placeholder="2" aria-label="Search" aria-describedby="basic-addon2">')
      $("#container" + index).append("<label>y<label>")
      $("#container" + index).append('  <input id=u-' + index + ' type="number" class="form-control bg-light border-0 small" placeholder="2" aria-label="Search" aria-describedby="basic-addon2">')
      $("#container" + index).append("<label>u<label>")
      //$(".drag_cont").empty();
      //$("#drag_cont").append('<div id="draggable" class="card w-25"><h5 class="card-header primary-color white-text">Draggable panel</h5><div class="card-body"><p class="card-text">Im draggable panel</p></div></div>')


      $('#drag_cont').append($('<div id="draggable" class="card w-25"><h5 class="card-header primary-color white-text"><b>G' + index + ':</b></h5><div class="card-body"><p class="card-text">Im draggable panel</p></div></div>'));
      $('.w-25').draggable()
      /* 
            $("#system_flow").append('  <input id=system_equation-' + index + ' type="text" class="form-control bg-light border-0 small" placeholder="G' + index + '(u+/- G3)" aria-label="Search" aria-describedby="basic-addon2">'); */

      //$(".containement").append('<div id="draggable" class="card w-25"><h5 class="card-header primary-color white-text">Draggable panel</h5><div class="card-body"><p class="card-text">Im draggable panel</p></div></div>')

    }
  });

  $('draggable').draggable({
    containment: "parent"

  });




  $("#compute").click(function () {

    $("#the_chart").hide();
    $("#information").hide();
    var sel_img = parseInt($('#selectImage').find(":selected").val());
    console.log(sel_img)
    var selectedOptionVal = parseInt($('#select_system').find(":selected").val());
    var equations = {}
    var ref = {}
    $("#ref_container div").each(function (index) {
      var ref_temp = {}
      $(this).find("select").each(function (index) {
        if (index == 0) { ref_temp["op"] = $(this).val() }


      });
      $(this).find("input").each(function (index) {
        if (index == 0) { ref_temp["n2"] = $(this).val() }
        else if (index == 1) { ref_temp["ret"] = $(this).val() }

      });
      ref['ref-' + parseInt(index + 1)] = ref_temp
    });

    $("#system_equation div").each(function (index) {
      var obj = {}
      $(this).find("input").each(function (index) {
        if (index == 0) { obj["y2"] = $(this).val() }
        else if (index == 1) { obj["y1"] = $(this).val() }
        else if (index == 2) { obj["y"] = $(this).val() }
        else if (index == 3) { obj["u"] = $(this).val() }
      });

      equations['G' + parseInt(index + 1)] = obj

    });
    var sel_img = parseInt($('#selectImage').find(":selected").val());
    if (!sel_img) {
      alertModal('Error', "Select a type of system")
      return
    }
    var time = $('#time').val()
    if (!time) {
      alertModal('Error', "Insert a valid time")
      return
    }
    var input = $('#input').val()
    if (!input) {
      alertModal('Error', "Insert a valid input")
      return
    }
    var flow = []

    if (time && input && sel_img) {

      $('#image_cont').hide()
      var use_controllers = $('#check_id').is(':checked')
      console.log("servono i controllers", use_controllers)
      console.log(equations)
      var jsonObjects =
      {
        'equations': equations,
        'time': time,
        'input': input,
        'flow': sel_img
      };
      if (use_controllers == true) {
        console.log("servono i controllers")
        var controllers_type = $('#select_controllers').find(":selected").val();
        if (!ref) {
          alertModal('Errore', "Inserisci una ref")
          return
        }
        if (controllers_type == "PI +Sat") {
          var kp = $('#controllers_input-kp').val()
          var ki = $('#controllers_input-ki').val()
          var sat = $('#controllers_input-sat').val()
          if (!kp && !ki) {
            alertModal('Errore', "Inserisci i valori del controllore")
            return
          }
          else {
            jsonObjects =
              {
                'equations': equations,
                'time': time,
                'input': input,
                'flow': sel_img,
                'controller': {
                  "type": controllers_type,
                  'kp': kp,
                  'ki': ki,
                  "sat": sat,
                  'ref': ref
                }
              };
          }
        }
        else if (controllers_type == "PI") {
          var kp = $('#controllers_input-kp').val()
          var ki = $('#controllers_input-ki').val()

          if (!kp && !ki) {
            alertModal('Errore', "Inserisci i valori del controllore")
            return
          }
          else {
            jsonObjects =
              {
                'equations': equations,
                'time': time,
                'input': input,
                'flow': sel_img,
                'controller': {
                  "type": "PI",
                  'kp': kp,
                  'ki': ki,
                  'ref': ref
                }

              };
          }
        }
        else if (controllers_type == "PID") {
          var kp = $('#controllers_input-kp').val()
          var ki = $('#controllers_input-ki').val()
          var kd = $('#controllers_input-kd').val()
          if (!kp || !ki || !kd) {
            alertModal('Errore', "Inserisci i valori del controllore")
            return
          }
          else {
            jsonObjects =
              {
                'equations': equations,
                'time': time,
                'input': input,
                'flow': sel_img,
                'controller': {
                  "type": controllers_type,
                  'kp': kp,
                  'ki': ki,
                  'kd': kd,
                  'ref': ref
                }
              };
          }
        }
        else if (controllers_type == "PID + Sat") {
          var kp = $('#controllers_input-kp').val()
          var ki = $('#controllers_input-ki').val()
          var kd = $('#controllers_input-kd').val()
          var sat = $('#controllers_input-sat').val()
          if (!kp || !ki || !kd) {
            alertModal('Errore', "Inserisci i valori del controllore")
            return
          }
          else {
            jsonObjects =
              {
                'equations': equations,
                'time': time,
                'input': input,
                'flow': sel_img,
                'controller': {
                  "type": controllers_type,
                  'kp': kp,
                  'ki': ki,
                  'kd': kd,
                  "sat": sat,
                  'ref': ref
                }
              };
          }
        }

      }
      $("#spinner").show();
      let tempi = [];
      let out = [];
      let ref_array = [];
      jQuery.ajax({
        url: "http://54.144.83.100:80/system",
        type: "POST",
        data: { system: JSON.stringify(jsonObjects) },
        dataType: "json",

        success: function (result) {

          $("#information").show();
          $("#spinner").hide();
          $("#system_information").empty();
          //Write your code here
          tempi = result["tempi"];
          out = result["output"];
          ref_array = result["ref"];
          $("#the_chart").empty();
          sleep(2000).then(() => { display_plot(tempi, out, ref_array) });
          $("#the_chart").show();

          $("#number_of_system").text(Object.keys(result["equations"]).length)


          for (const [key, value] of Object.entries(result["equations"])) {
            console.log(key, value);
            $("#system_information").append('  <div style="background: rgba(174, 255, 220, 0.639); border-radius: 10px; padding: 11px;margin-bottom: 5px;border-color: rgba(133, 189, 165, 0.639);border-style: solid;border-width: 1px;"> <b>' + key + '</b>: <label>' + value["y2"] + 'y`` = ' + value["y1"] + 'y`' + ' ' + value["y"] + 'y' + ' ' + value["u"] + 'u' + '</label><br />         <b>Autovalori</b>: <label>' + value["autovalori"].replace("FiniteSet", "") + '</label><br /> <b>Stability:</b> ' + value['stabilita'] + ' </div>')
          }
        },
        error: function (xhr, status, error) {
          $("#spinner").hide();
          alertModal('Error', error)
        }
      });




    }

  });

  /*  data:  */

  $("#select_controllers").on('change', function () {    // 2nd (A)
    var selectedOptionVal = $('#select_controllers').find(":selected").val();
    $("#controllers_input").empty()

    switch (selectedOptionVal) {
      case "PI +Sat":
        console.log(selectedOptionVal)
        $("#controllers_input").append('<b>kp</b>');
        $("#controllers_input").append('  <input id=controllers_input-kp type="text" class="form-control bg-light border-0 small" placeholder="10" aria-label="Search" aria-describedby="basic-addon2">');
        $("#controllers_input").append('<b>ki</b>');
        $("#controllers_input").append('  <input id=controllers_input-ki type="text" class="form-control bg-light border-0 small" placeholder="3" aria-label="Search" aria-describedby="basic-addon2">');
        $("#controllers_input").append('<b>sat</b>');
        $("#controllers_input").append('  <input id=controllers_input-sat type="text" class="form-control bg-light border-0 small" placeholder="3" aria-label="Search" aria-describedby="basic-addon2">');
        break;
      case "PI":
        $("#controllers_input").append('<b>kp</b>');
        $("#controllers_input").append('  <input id=controllers_input-kp type="text" class="form-control bg-light border-0 small" placeholder="10" aria-label="Search" aria-describedby="basic-addon2">');
        $("#controllers_input").append('<b>ki</b>');
        $("#controllers_input").append('  <input id=controllers_input-ki type="text" class="form-control bg-light border-0 small" placeholder="3" aria-label="Search" aria-describedby="basic-addon2">');
        break;
      case "PID":
        $("#controllers_input").append('<b>kp</b>');
        $("#controllers_input").append('  <input id=controllers_input-kp type="text" class="form-control bg-light border-0 small" placeholder="10" aria-label="Search" aria-describedby="basic-addon2">');
        $("#controllers_input").append('<b>ki</b>');
        $("#controllers_input").append('  <input id=controllers_input-ki type="text" class="form-control bg-light border-0 small" placeholder="3" aria-label="Search" aria-describedby="basic-addon2">');
        $("#controllers_input").append('<b>kd</b>');
        $("#controllers_input").append('  <input id=controllers_input-kd type="text" class="form-control bg-light border-0 small" placeholder="3" aria-label="Search" aria-describedby="basic-addon2">');
        break;
      case "PID + Sat":
        $("#controllers_input").append('<b>kp</b>');
        $("#controllers_input").append('  <input id=controllers_input-kp type="text" class="form-control bg-light border-0 small" placeholder="10" aria-label="Search" aria-describedby="basic-addon2">');
        $("#controllers_input").append('<b>ki</b>');
        $("#controllers_input").append('  <input id=controllers_input-ki type="text" class="form-control bg-light border-0 small" placeholder="3" aria-label="Search" aria-describedby="basic-addon2">');
        $("#controllers_input").append('<b>kd</b>');
        $("#controllers_input").append('  <input id=controllers_input-kd type="text" class="form-control bg-light border-0 small" placeholder="3" aria-label="Search" aria-describedby="basic-addon2">');
        $("#controllers_input").append('<b>sat</b>');
        $("#controllers_input").append('  <input id=controllers_input-sat type="text" class="form-control bg-light border-0 small" placeholder="3" aria-label="Search" aria-describedby="basic-addon2">');
        break;

    }

  });



  function alertModal(title, body) {
    // Display error message to the user in a modal
    $('#alert-modal-title').html(title);
    $('#alert-modal-body').html(body);
    $('#modal-error').css('background-color', 'rgb(255, 205, 205)');
    $('#modal-error').css('color', 'black');
    $('#alert-modal').modal('show');
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  function display_plot(time_array, output_array, ref_array) {

    $("#the_chart").append('<div class="card shadow mb-4"> <!-- Card Header - Dropdown --> <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between"> <h6 class="m-0 font-weight-bold text-primary">Plot</h6> <div class="dropdown no-arrow"></div></div><div class="card-body"><div class="chart-area"><canvas id="myAreaChart"></canvas></div></div></div></div>');
    let ctx = $("#myAreaChart");
    let myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: time_array,
        datasets: [{
          label: "Output",
          lineTension: 0.1,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 1,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 1,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 5,
          pointBorderWidth: 1,
          data: output_array,
        },
        {
          label: "Ref",
          lineTension: 0.1,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(255, 11, 23, 1)",
          pointRadius: 1,
          pointBackgroundColor: "rgba(255, 11, 23, 1)",
          pointBorderColor: "rgba(255, 11, 23, 1)",
          pointHoverRadius: 1,
          pointHoverBackgroundColor: "rgba(255, 11, 23, 1)",
          pointHoverBorderColor: "rgba(255, 11, 23, 1)",
          pointHitRadius: 5,
          pointBorderWidth: 1,
          data: ref_array,
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 7,
              callback: function (value, index, values) {
                return number_format(value.toFixed(2)) + 's';
              }
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 10,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return value ;//number_format(value.toFixed(2));
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          /*  callbacks: {
             label: function (tooltipItem, chart) {
               var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
               return datasetLabel + number_format(tooltipItem.yLabel);
             }
           } */
        }
      }
    });

  }


  function validate_equation(system) {
    if (!system.includes("=")) { return false }

    else if (system.includes("y''") && !system.includes("y'")) { return false }

    else if (!system.includes("y'")) { return false }

    else if (!system.includes("u")) { return false }

    return true
  }
})(jQuery); // End of use strict




