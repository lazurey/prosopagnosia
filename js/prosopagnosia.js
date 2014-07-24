;(function($) {
  $(document).ready(function() {
    initGame();
    linkAction();
    initOther();
  });

  var clickStack = [];
  var rowNum = 12, colNum = 8, pplNum = 8;

  function initGame() {
    var $canvas = $('#canvas');
    $canvas.empty();


    var tile = "";

    var gameMatrix = [];
    for (var i = 0; i < colNum; i++) {
      gameMatrix[i] = [];
      for (var j = 0; j < rowNum; j++) {
        var avatar = getRandomInt(1, pplNum);
        gameMatrix[i][j] = avatar;
        tile += "<div class='tile avatar-" + avatar + "' data-avatar='" + avatar + "' data-pos='" + i + "-" + j + "'></div>";
      }
    }
    $canvas.append(tile);

    var countArr = [];
    var temp = 0;
    for (var i = 1; i <= pplNum; i++) {
      var count = $('[data-avatar="' + i + '"]').length;
      countArr[i - 1] = count;
      if (count % 2 != 0) {
        if (temp != 0) {
          $('[data-avatar="' + i + '"]').eq(0).attr('data-avatar', temp).removeClass('avatar-' + i).addClass('avatar-' + temp);
          temp = 0;
        } else {
          temp = i;
        }
      }
    }
  }

  function linkAction() {
    $('.tile').click(function() {
      console.log(2);
      var curAvatar = parseInt($(this).attr('data-avatar')),
          curPos = $(this).attr('data-pos');
      
      if ($(this).hasClass('selected')) {
        clickStack = [];
        $(this).removeClass('selected');
        return false;
      }

      if (clickStack.length == 2) {
        if (clickStack[0] == curAvatar) {
          removeBoth([curPos, clickStack[1]]);
        } else {
          gameOver();
        }
      } else {
        clickStack = [curAvatar, curPos];
        $(this).addClass('selected');
      }
    });
  }

  function removeBoth(posArr) {
    for (var i = 0; i < 2; i++) {
      $('[data-pos="' + posArr[i] + '"]').addClass('removed').attr('data-avatar', '0');
    }
    if ($('[data-avatar=0]').length == rowNum * colNum) {
      gameSuccess();
    }
    $('.selected').removeClass('selected');
    clickStack = [];
  }

  function gameOver() {
    $('#game-over').show();
  }

  function gameSuccess() {
    $('#game-success').show();
  }

  function initOther() {
    $(".start").click(function() {
      $('.selected').removeClass('selected');
      initGame();
      linkAction();
      clickStack = [];
      $('#game-over, #game-success').hide();
    });
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
})(jQuery);