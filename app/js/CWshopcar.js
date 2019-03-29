$(function() {
	var $allCheckbox = $('.list_chk'),
		$wholeChexbox = $('.whole_check'),
		$cartBox = $('.cartBox'),
		$sonCheckBox = $('.son_check');
	$allCheckbox.click(function() {
		if ($(this).is(':checked')) {
			$(this).next('label').addClass('mark');
		} else {
			$(this).next('label').removeClass('mark')
		}
	});
	// 全选按钮
	$wholeChexbox.click(function() {
		var $checkboxs = $cartBox.find('input[type="checkbox"]');
		if ($(this).is(':checked')) {
			$checkboxs.prop("checked", true);
			$checkboxs.next('label').addClass('mark');
		} else {
			$checkboxs.prop("checked", false);
			$checkboxs.next('label').removeClass('mark');
		}
		totalMoney();
	});
	// 
	$sonCheckBox.each(function() {
		$(this).click(function() {
			if ($(this).is(':checked')) {
				var len = $sonCheckBox.length;
				var num = 0;
				$sonCheckBox.each(function() {
					if ($(this).is(':checked')) {
						num++;
					}
				});
				if (num == len) {
					$wholeChexbox.prop("checked", true);
					$wholeChexbox.next('label').addClass('mark');
				}
			} else {
				$wholeChexbox.prop("checked", false);
				$wholeChexbox.next('label').removeClass('mark');
			}
		})
	})
	$wholeChexbox.each(function() {
		$(this).click(function() {
			if ($(this).is(':checked')) {
				var len = $wholeChexbox.length;
				var num = 0;
				$wholeChexbox.each(function() {
					if ($(this).is(':checked')) {
						num++;
					}
				});
				if (num == len) {
					$wholeChexbox.prop("checked", true);
					$wholeChexbox.next('label').addClass('mark');
				}
				$(this).parents('.cartBox').find('.son_check').prop("checked", true);
				$(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
			} else {
				$wholeChexbox.prop("checked", false);
				$wholeChexbox.next('label').removeClass('mark');
				$(this).parents('.cartBox').find('.son_check').prop("checked", false);
				$(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
			}
			totalMoney();
		});
	});
	// 小按钮点击
	$cartBox.each(function() {
		var $this = $(this);
		var $sonChecks = $this.find('.son_check');
		$sonChecks.each(function() {
			$(this).click(function() {
				if ($(this).is(':checked')) {
					var len = $sonChecks.length;
					var num = 0;
					$sonChecks.each(function() {
						if ($(this).is(':checked')) {
							num++;
						}
					});
					if (num == len) {
						$(this).parents('.cartBox').find('.whole_check').prop("checked", true);
						$(this).parents('.cartBox').find('.whole_check').next('label').addClass('mark');
					}
				} else {
					$(this).parents('.cartBox').find('.whole_check').prop("checked", false);
					$(this).parents('.cartBox').find('.whole_check').next('label').removeClass('mark');
				}
				totalMoney();
			});
		});
	});
	// 数量加
	var $plus = $('.plus'),
		$reduce = $('.reduce'),
		$all_sum = $('.sum');
	$plus.click(function() {
		var $inputVal = $(this).prev('input'),
			$count = parseInt($inputVal.val()) + 1,
			$obj = $(this).parents('.amount_box').find('.reduce'),
			$priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),
			$priceTotal = $count * parseInt($price.substring(1));
		$inputVal.val($count);
		$priceTotalObj.html('￥' + $priceTotal + '.00');
		if ($inputVal.val() > 1 && $obj.hasClass('reSty')) {
			$obj.removeClass('reSty');
		}
		totalMoney();
	});
	// 数量减
	$reduce.click(function() {
		var $inputVal = $(this).next('input'),
			$count = parseInt($inputVal.val()) - 1,
			$priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
			$price = $(this).parents('.order_lists').find('.price').html(),
			$priceTotal = $count * parseInt($price.substring(1));
		if ($inputVal.val() > 1) {
			$inputVal.val($count);
			$priceTotalObj.html('￥' + $priceTotal + '.00');
		}
		if ($inputVal.val() == 1 && !$(this).hasClass('reSty')) {
			$(this).addClass('reSty');
		}
		totalMoney();
	});
	// 文本框数量
	$all_sum.keyup(function() {
		var $count = 0,
			$priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
			$price = $(this).parents('.order_lists').find('.price').html(),
			$priceTotal = 0;
		if ($(this).val() == '') {
			$(this).val('1');
		}
		$(this).val($(this).val().replace(/\D|^0/g, ''));
		$count = $(this).val();
		if($count > 100){
			$count = 100;
		}
		$priceTotal = $count * parseInt($price.substring(1));
		$(this).attr('value', $count);
		$priceTotalObj.html('￥' + $priceTotal + '.00');
		totalMoney();
	})
	// 移除商品
	var $order_lists = null;
	var $order_content = '';
	$('.delbtn').click(function() {
		$('.my_model').css('display','block');
		$order_lists = $(this).parents('.order_lists');
		$order_content = $order_lists.parents('.order_content');
	});
	$('.closeModel').click(function() {
		closeM();
	});
	$('.dialog-close').click(function() {
		closeM();
	});

	function closeM() {
		$('.my_model').css('display','none');
	}
	$('.dialog-sure').click(function() {
		$order_lists.remove();
		if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
			$order_content.parents('.cartBox').remove();
		}
		closeM();
		$sonCheckBox = $('.son_check');
		totalMoney();
	})
// 结算
	function totalMoney() {
		var total_money = 0;
		var total_count = 0;
		var calBtn = $('.calBtn a');
		$sonCheckBox.each(function() {
			if ($(this).is(':checked')) {
				var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
				var num = parseInt($(this).parents('.order_lists').find('.sum').val());
				total_money += goods;
				total_count += num;
			}
		});
		$('.total_text').html('￥' + total_money + '.00');
		
		$('.piece_num').html(total_count);
		if (total_money != 0 && total_count != 0) {
			if (!calBtn.hasClass('btn_sty')) {
				calBtn.addClass('btn_sty');
			}
		} else {
			if (calBtn.hasClass('btn_sty')) {
				calBtn.removeClass('btn_sty');
			}
		}
	}
});