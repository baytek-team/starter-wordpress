<?php
//Template for drawing breadcrumbs, ideally in the hero banner

global $post;

//Get the ancestors
$ancestors = array_reverse((array) get_ancestors($post->ID, get_post_type($post)));

//Conditionally link self at the end (for trickery)
if ($append_self) {
    $ancestors[] = $post->ID;
}

//Don't render empty crumbs
if (empty($ancestors)) return;
?>

<span class="breadcrumbs">
    <?php foreach ($ancestors as $ancestor) : ?>
        <span class="eyebrow crumb"><a href="<?php echo get_permalink($ancestor); ?>"><?php echo get_the_title($ancestor); ?></a></span>
    <?php endforeach; ?>
</span>