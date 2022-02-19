import { CreatePostDTO } from '@src/notion/domain/dto/create-post.dto';
import { extractThumbnailFromPost } from './extractThumbnailFromPost';

it('test with not images will return null', () => {
  const test: CreatePostDTO = {
    title: 'title',
    content: `---
    __Advertisement :)__
    
    - __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
      resize in browser.
    - __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
      i18n with plurals support and easy syntax.
    
    You will like those projects!
    
    ---
    
    # h1 Heading 8-)
    ## h2 Heading
    ### h3 Heading
    #### h4 Heading
    ##### h5 Heading
    ###### h6 Heading
    
    
    ## Horizontal Rules
    
    ___
    
    ---
    
    ***
    
    
    ## Typographic replacements
    
    Enable typographer option to see result.
    
    (c) (C) (r) (R) (tm) (TM) (p) (P) +-
    
    test.. test... test..... test?..... test!....
    
    !!!!!! ???? ,,  -- ---
     
    `,
  };

  const result = extractThumbnailFromPost(test);

  expect(result).toEqual(undefined);
});

it('test with success will return image path', () => {
  const string = `
![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]
`;
  const post: CreatePostDTO = {
    title: 'title',
    content: string,
  };

  const result = extractThumbnailFromPost(post);

  expect(result).toEqual(result);
});
