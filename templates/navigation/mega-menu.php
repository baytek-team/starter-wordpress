<!--

Mega Menu
Reminder: 
1. When you add your menu click CSS Classes and Description on in the Screen Options
2. Top Mega Menu items need the .has-mega-menu classes
-->
    <div class="primary-menu__wrapper">
        <div class="primary-menu">
            <nav class="main-navigation" role="navigation">
                <ul>
                <?php $locations = get_nav_menu_locations();

                if ( isset( $locations['primary']) ) {
                    $menu = get_term( $locations['primary'], 'nav_menu');
                    
                    if ( $items = wp_get_nav_menu_items( $menu->name ) ) {

                        // loop through all menu items to display their content
                        foreach ( $items as $item ) {

                            // if the current item is not a top level item, skip it
                            if ($item->menu_item_parent != 0) {
                                continue;
                            }

                            $curNavItemID = $item->ID;

                            // get the custom classes for the item
                            $classList = implode(" ", $item->classes);
                            echo "<li class=\"{$classList}\">";
                            echo "<a href=\"{$item->url}\">{$item->title}</a>";

                            if ( in_array('has-mega-menu', $item->classes)) { ?>
                                <div class="mega-menu__wrapper js-mega-menu">
                                    <div class="mega-menu">

                                        <div class="mega-menu__content">
                                            <h2><?= $item->post_title; ?></h2>
                                            <p><?= $item->description; ?></p>
                                            <a href="<?= $item->url; ?>" class="learn-more">Learn More</a>
                                        </div>

                                        <div class="mega-menu__subnav">
                                            <nav>
                                                <ul class="subnav">
                                                <?php // cycle through the menu items and get the subnav
                                                foreach ( $items as $subnav) {
                                                    if ( $subnav->menu_item_parent == $curNavItemID) {
                                                        echo "<li><a href=\"{$subnav->url}\">{$subnav->title}</a>";
                                                    }
                                                } ?>
                                                </ul>
                                            </nav>
                                        </div>

                                    </div>
                                </div>
                            <?php }
                            echo '</li>';
                        }
                    }
                } ?>
                </ul>
            </nav>
        </div>
    </div>