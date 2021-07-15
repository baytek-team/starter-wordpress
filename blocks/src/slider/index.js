/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
  InspectorControls,
  PanelColorSettings,
  MediaUpload, PlainText,
} from '@wordpress/blockEditor';

/**
 * Internal dependencies
 */

registerBlockType( 'theme-blocks/slider', {
  title: __( 'Slider' ),
  icon: 'buddicons-activity', // https://developer.wordpress.org/resource/dashicons
  category: 'theme-blocks', // Custom category: see index.php

  attributes: {
    id: {
      source: "attribute",
      selector: ".carousel.slide",
      attribute: "id"
    },
    baytek_carousels: {
      source: "query",
      default: [],
      selector: "div.baytek_carousel",
      query: {
        image: {
          source: "attribute",
          selector: "img",
          attribute: "src"
        },
        index: {
          source: "text",
          selector: "span.baytek_carousel-index"
        },
        title: {
          source: "text",
          selector: "h5.baytek_carousel-title"
        },
        content: {
          source: "text",
          selector: "span.baytek_carousel-text"
        },
        link: {
          source: "attribute",
          selector: "a",
          attribute: "href"
        },
      }
    }
  },


  // The "edit" property must be a valid function.
  edit: props => {
    const { baytek_carousels } = props.attributes;

    if (!props.attributes.id) {
      const id = 'baytek_carousel${Math.floor(Math.random() * 100)}';
      props.setAttributes({
        id
      });
    }

    const baytek_carouselsList = baytek_carousels
      .sort((a, b) => a.index - b.index)
      .map(baytek_carousel => {
        return (
          <div className="slider-block">
            <p className="insert-slide">
              <span>
                Insert Slide #{Number(baytek_carousel.index) + 1} Here:
              </span>
              <span
                className="remove-slide"
                onClick={() => {
                  const newCarousels = baytek_carousels
                    .filter(item => item.index != baytek_carousel.index)
                    .map(t => {
                      if (t.index > baytek_carousel.index) {
                        t.index -= 1;
                      }

                      return t;
                    });

                  props.setAttributes({
                    baytek_carousels: newCarousels
                  });
                }}
              >
                <svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-no-alt" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"></path></svg>
              </span>
            </p>
            <div className="baytek-slide-wrapper">

              {/* <label>Content:</label> */}
              <PlainText
                className="slide-title"
                placeholder="Slide Title"
                value={baytek_carousel.title}
                autoFocus
                onChange={title => {
                  const newObject = Object.assign({}, baytek_carousel, {
                    title: title
                  });
                  props.setAttributes({
                    baytek_carousels: [
                      ...baytek_carousels.filter(
                        item => item.index != baytek_carousel.index
                      ),
                      newObject
                    ]
                  });
                }}
              />
              <PlainText
                className="content-plain-text"
                placeholder="Slide Description"
                value={baytek_carousel.content}
                autoFocus
                onChange={content => {
                  const newObject = Object.assign({}, baytek_carousel, {
                    content: content
                  });
                  props.setAttributes({
                    baytek_carousels: [
                      ...baytek_carousels.filter(
                        item => item.index != baytek_carousel.index
                      ),
                      newObject
                    ]
                  });
                }}
              />
              <PlainText
                className="button-link"
                placeholder="Slider Link"
                value={baytek_carousel.link}
                autoFocus
                onChange={link => {
                  const newObject = Object.assign({}, baytek_carousel, {
                    link: link
                  });
                  props.setAttributes({
                    baytek_carousels: [
                      ...baytek_carousels.filter(
                        item => item.index != baytek_carousel.index
                      ),
                      newObject
                    ]
                  });
                }}
              />

              <div className="row">
                <div className="slide__image__wrapper">
                  <MediaUpload
                    onSelect={media => {
                      const image = media.sizes.full
                        ? media.sizes.full.url
                        : media.url;
                      const newObject = Object.assign({}, baytek_carousel, {
                        image: image
                      });
                      props.setAttributes({
                        baytek_carousels: [
                          ...baytek_carousels.filter(
                            item => item.index != baytek_carousel.index
                          ),
                          newObject
                        ]
                      });
                    }}
                    type="image"
                    value={baytek_carousel.image}
                    render={({ open }) =>
                      !!baytek_carousel.image ? (
                        <div>
                          {props.isSelected && (
                            <div className="slide__image__wrapper__actions">
                              <a
                                href="#"
                                onClick={() => {
                                  const newObject = Object.assign(
                                    {},
                                    baytek_carousel,
                                    {
                                      image: null
                                    }
                                  );
                                  props.setAttributes({
                                    baytek_carousels: [
                                      ...baytek_carousels.filter(
                                        item => item.index != baytek_carousel.index
                                      ),
                                      newObject
                                    ]
                                  });
                                }}
                              >
                                <svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-no-alt" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="5 -5 12 20"><path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"></path></svg> 
                                Remove
                              </a>
                            </div>
                          )}

                          <div
                            className="slide__image__inner"
                            style={{
                              backgroundImage: `url(${baytek_carousel.image})`
                            }}
                            onClick={open}
                          />
                        </div>
                      ) : (
                        <a
                          href="#"
                          className="slide__image__inner"
                          onClick={open}
                        >
                          Select Image
                        </a>
                      )
                    }
                  />
                </div>
              </div>
              
            </div>
          </div>
        );
      });
    return (
      <div className={props.className}>
        {baytek_carouselsList}
        <button
          className="add-more-slides"
          onClick={content =>
            props.setAttributes({
              baytek_carousels: [
                ...props.attributes.baytek_carousels,
                {
                  index: props.attributes.baytek_carousels.length,
                  content: "",
                }
              ]
            })
          }
        >
          +
        </button>
      </div>
    );
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  save: props => {
    const { id, baytek_carousels } = props.attributes;
    const baytek_carouselsList = baytek_carousels.map(function(baytek_carousel) {
      const carouselClass = "baytek-carousel-item";
      return (
        <div className={carouselClass} key={baytek_carousel.index}>
          <div className="baytek_carousel card">
            <span className="baytek_carousel-index" style={{ display: "none" }}>
              {baytek_carousel.index}
            </span>
              <div class="content">
              {baytek_carousel.title && (
                  <h5 className="baytek_carousel-title">{baytek_carousel.title}</h5>
              )}
              {baytek_carousel.content && (
                <p className="baytek_carousel-text-container">
                  <span className="baytek_carousel-text">{baytek_carousel.content}</span>
                </p>
              )}
              <a className="baytek_carousel-link" href={baytek_carousel.link}></a>
              </div>
              {baytek_carousel.image && (
                <div className="slide__image__wrapper">
                  <img src={baytek_carousel.image} style={{ display: "none" }} />
                  <div
                    className="slide__image__inner"
                    style={{
                      backgroundImage: `url(${baytek_carousel.image})`
                    }}
                  />
                </div>
              )}
          </div>
        </div>
      );
    });
    if (baytek_carousels.length > 0) {
      return (
        <div className="carousel-slider">
              {baytek_carouselsList}
        </div>
      );
    } else return null;
  }
});
