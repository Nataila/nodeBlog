$(document).ready(function () {
  $('.btn-tag-add').on('click', function () {
    var tagName = $('.tag-name').val();
    $.ajax({
      type: 'POST',
      url: '/tags',
      data: {'name': tagName},
      success: function (data) {
        var newTagName = data.name;
        var insertDom = '<span class="label label-info">' + newTagName + '</span>';
        $('.tags-had span:eq(0)').before(insertDom);
        $('.alert-tags-success').slideDown();
        $('.tag-name').val('');
      }
    });
  });
  $('#pagination-postList').twbsPagination({
      totalPages: Math.ceil(parseInt($('.pagination-f').data('count')) / 10),
      visiblePages: 7,
      href: "?page={{number}}"
  });
});
