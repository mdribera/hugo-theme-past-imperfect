# Past Imperfect

This is a Hugo theme used to share projects. The design is based on HTML5 UP's [Future Imperfect](http://html5up.net/future-imperfect) and was inspired by [Julio Pescador's Hugo-ification of it](https://github.com/jpescador/hugo-future-imperfect).

## Getting Started

Follow the [quick start instructions](https://gohugo.io/getting-started/quick-start/) from Hugo:

1. Install Hugo: `brew install hugo`

2. Make a new site: `hugo new site your-site`

3. Put past-imperfect in the `/themes` directory.

    - Add it as a **submodule**:
     
    `cd your-site`
    
    `git init`
    
    `git submodule add https://github.com/mdribera/hugo-theme-past-imperfect.git themes/past-imperfect`
       
    - Or add it as a **symlink**:
    
    `git clone https://github.com/mdribera/hugo-theme-past-imperfect.git`

    `ln -s hugo-theme-past-imperfect your-site/themes/past-imperfect`
    
4. Build the theme.

    - Change to Past Imperfect's directory: `cd themes/past-imperfect`

    - Install node modules: `npm i`
    
    - Run webpack: `npm run build`

5. Update your Hugo config to specify the theme.

    - Append it to an already existing config: `echo 'theme = "past-imperfect"' >> config.toml`
    
    - Or copy the config from exampleSite: `cp themes/past-imperfect/exampleSite/config.toml config.toml`

6. Write something! `hugo new --kind project-bundle projects/my-cool-new-thing`

7. Check it out at [localhost:1313](localhost:1313) by running: `hugo server`

8. Profit $$$

### exampleSite

The exampleSite provides a sample config.toml for easy configuration!

    exampleSite
    ├── config.toml
    └── content
        ├── logo.jpg
        ├── about
        │   ├── index.md
        │   ├── banner.jpg
        │   └── porky.jpg
        └── projects
            └── looney-tunes
                ├── index.md
                ├── banner.jpg
                └── assets
                    ├── bugs.jpg
                    ├── coyote.jpg
                    └── king.jpg
    ...
    
You can test the theme out in the exampleSite by:

    cd hugo-theme-past-imperfect/exampleSite
    ln -s ../../ themes/past-imperfect
    hugo server
    
## Development

If you'd like to modify or add to the theme, you can run `npm start` instead of `npm run build` to produce source maps and watch for changes.

`npm run lint` will run both eslint and sasslint. 

### TODO Checklist

- [x] Use SCSS, ES6, babel, webpack, sass-lint, and eslint
- [x] Make eslint and sass-lint pass
- [x] Setup prod (minify, etc) and dev (sourcemap, etc) webpack workflow
- [x] Include [Photoswipe](https://github.com/liwenyip/hugo-easy-gallery) image gallery shortcode
- [x] Use [Hugo's syntax highlighting](https://gohugo.io/content-management/syntax-highlighting/) rather than runtime highlight.js
- [x] Use other static asset processing that Hugo provides?
- [ ] Lazy load images
- [ ] Favicon variations
- [ ] Revisit taxonomy/category views, navbar, and menu

## Credits and Authors

The design is based on [HTML5UP's Future Imperfect](https://html5up.net/future-imperfect).
Julio Pescador first created a direct port of [Future Imperfect for Hugo](https://github.com/jpescador/hugo-future-imperfect).
I simplified Future Imperfect's design in order to better share projects and rewrote it to include bear minimum HTML, CSS, and JS.

- [Font Awesome](https://github.com/FortAwesome/Font-Awesome)
- [Hugo Easy Gallery](https://github.com/liwenyip/hugo-easy-gallery) which uses [PhotoSwipe](https://github.com/dimsemenov/photoswipe).


