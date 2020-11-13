<?php
//Sidebar template part for the sharing code
?>
<div class="social-share">
    <?php
    if (isset($GLOBALS['et_monarch'])) : ?>
    <p><?php _e('Share', THEMEL10N); ?></p>
    <?php
        $monarch_options = $GLOBALS['et_monarch']->monarch_options;
        echo $GLOBALS['et_monarch']->generate_inline_icons('et_social_inline_top');
    endif;
    ?>
</div>