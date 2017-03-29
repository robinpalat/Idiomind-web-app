(function($) {

  /**
   * Automatically enables required permissions on demand.
   *
   * Many users do not understand that two permissions are required for the
   * administration menu to appear. Since Drupal core provides no facility for
   * this, we implement a simple manual confirmation for automatically enabling
   * the "other" permission.
   */
  Drupal.behaviors.opignoPermissions = {
    attach: function (context, settings) {
      $('#permissions', context).once('opigno-permissions-setup', function () {
        // Retrieve matrix/mapping - these need to use the same indexes for the
        // same permissions and roles.
        var $roles = $(this).find('th:not(:first)');
        var $admin = $(this).find('input[name$="[access administration pages]"]');
        var $opigno = $(this).find('input[name$="[access opigno administration pages]"]');

        // Retrieve the permission label - without description.
        var adminPermission = $.trim($admin.eq(0).parents('td').prev().children().get(0).firstChild.textContent);
        var opignoPermission = $.trim($opigno.eq(0).parents('td').prev().children().get(0).firstChild.textContent);

        $admin.each(function (index) {
          // Only proceed if both are not enabled already.
          if (!(this.checked && $opigno[index].checked)) {
            // Stack both checkboxes and attach a click event handler to both.
            $(this).add($opigno[index]).click(function () {
              // Do nothing when disabling a permission.
              if (this.checked) {
                // Figure out which is the other, check whether it still disabled,
                // and if so, ask whether to auto-enable it.
                var other = (this == $admin[index] ? $opigno[index] : $admin[index]);
                if (!other.checked && confirm(Drupal.t('Also allow !name role to !permission?', {
                  '!name': $roles[index].textContent,
                  '!permission': (this == $admin[index] ? opignoPermission : adminPermission)
                }))) {
                  other.checked = 'checked';
                }
              }
            });
          }
        });
      });
    }
  };

})(jQuery);