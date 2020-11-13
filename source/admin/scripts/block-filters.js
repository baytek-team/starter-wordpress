var supportsNarrow = ['core/group'];
var narrowSvg = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path stroke="null" id="svg_1" d="m8.1875,9l0,6l6.875,0l0,-6l-6.875,0zm5.40179,-4.8l-3.92857,0l0,1.5l3.92857,0l0,-1.5zm-3.92857,15.6l3.92857,0l0,-1.5l-3.92857,0l0,1.5z"/></svg>';
var shouldChangeIcon = false;

function changeAlignmentSettings( settings, name ) {
    if (supportsNarrow.indexOf(name) == -1) {
        return settings;
    }

    if (settings.supports && settings.supports.align && settings.supports.align.length) {
        settings.supports.align.push('narrow');
    }

    return settings;
}

wp.hooks.addFilter(
    'blocks.registerBlockType',
    'baytek/theme/alignment',
    changeAlignmentSettings
);

var changeEditorControls = wp.compose.createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.isSelected) {
            if (props.attributes && props.attributes.align && props.attributes.align == 'narrow') {
                shouldChangeIcon = true;
            }
            else {
                shouldChangeIcon = false;
            }

            window.setTimeout(function() {
                jQuery(document).trigger('maybeChangeIcon');
            }, 30);
        }

        return wp.element.createElement(
            wp.element.Fragment,
            {},
            wp.element.createElement(
                BlockEdit,
                props
            )
        );
    };
}, 'changeEditorControls');

wp.hooks.addFilter(
    'editor.BlockEdit',
    'baytek/theme/editor-controls',
    changeEditorControls
);

//Begin the hacks
(function($){
    //Javascript to change the react components and fill out empty alignment options, since Wordpress is extraordinarily difficult about this
    $(document).on('click', 'button[aria-label="Change alignment"]', function(e) {
        window.setTimeout(function() {
            $('.components-dropdown-menu__menu[aria-label="Change alignment"] button:not(.has-icon)')
                .html(narrowSvg + 'Narrow width')
                .addClass('has-icon has-text');
        }, 30);
    });

    $(document).on('maybeChangeIcon', fixIcon);

    function fixIcon(e) {
        if (shouldChangeIcon) {
            $('button[aria-label="Change alignment"] svg').replaceWith(narrowSvg);
        }
    }
})(jQuery);
