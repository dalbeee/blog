export const pageBlock = {
  object: "list",
  results: [
    {
      object: "block",
      id: "8656483b-4996-4ca2-b6e2-42b0d816c653",
      created_time: "2021-04-13T04:27:00.000Z",
      last_edited_time: "2021-04-13T04:27:00.000Z",
      has_children: false,
      archived: false,
      type: "image",
      image: {
        caption: [],
        type: "file",
        file: {
          url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1ac9e3b4-8e09-404d-b0b5-9a41460ff9f3/nextjs.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210930%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210930T094627Z&X-Amz-Expires=3600&X-Amz-Signature=8fd03a972268d14e7a6554c5247a3190f61fa03c90ceafe8e4173788230e7a36&X-Amz-SignedHeaders=host",
          expiry_time: "2021-09-30T10:46:27.192Z",
        },
      },
    },
    {
      object: "block",
      id: "6c88d006-90c1-452f-9ad7-4d00d696c6cc",
      created_time: "2021-04-12T15:46:00.000Z",
      last_edited_time: "2021-04-12T16:21:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: {
              content: "✨ 소개",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "✨ 소개",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "f03e0701-fbfc-4771-a5d7-d03b4a470619",
      created_time: "2021-04-12T15:46:00.000Z",
      last_edited_time: "2021-04-12T16:20:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: {
              content: " ",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: " ",
            href: null,
          },
          {
            type: "text",
            text: {
              content: "이 문서",
              link: {
                url: "https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly",
              },
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "이 문서",
            href: "https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly",
          },
          {
            type: "text",
            text: {
              content:
                " 에 따르면 next.js 의 서버사이드에서 api 요청을 보낼때는 클라이언트 측에서 보내는것이 아니기 때문에, url 을 다르게 설정해야합니다. 브라우저에서 요청하는것과 달리, ssr나 ssg 는 next.js 에서 요청을 보내기때문에, 같은 목적지를 가진 api를 요청한다고 해도 주소가 달라지겠죠?😊 ",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text:
              " 에 따르면 next.js 의 서버사이드에서 api 요청을 보낼때는 클라이언트 측에서 보내는것이 아니기 때문에, url 을 다르게 설정해야합니다. 브라우저에서 요청하는것과 달리, ssr나 ssg 는 next.js 에서 요청을 보내기때문에, 같은 목적지를 가진 api를 요청한다고 해도 주소가 달라지겠죠?😊 ",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "8299cf02-71a9-4752-a32f-86b1cdc29cfd",
      created_time: "2021-04-12T15:46:00.000Z",
      last_edited_time: "2021-04-12T16:20:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: {
              content: "🎁 방법",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "🎁 방법",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "2350cffe-055d-490c-8130-52eaf43afa58",
      created_time: "2021-04-12T16:09:00.000Z",
      last_edited_time: "2021-04-12T16:14:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: {
              content:
                "생각은 오래했는데, 방법은 너무 간단하네요...😢 요청을 보내기전에 context에서 window 객체를 가지고 있는지 검사한 다음, uri 를 수정하였습니다. 네트워크 상의 api를 받을 컴퓨터의 호스트네임이 http://backend:3000 이고, api의 uri는 api/post 라고 가정해볼게요. next.js 에서 요청할 때는 http://backend:3000/api/post 주소로 요청을 보내면 되고, 클라이언트 사이드에서 보낸다면 호스트네임 없이 /api/post 보내면 될거에요.",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text:
              "생각은 오래했는데, 방법은 너무 간단하네요...😢 요청을 보내기전에 context에서 window 객체를 가지고 있는지 검사한 다음, uri 를 수정하였습니다. 네트워크 상의 api를 받을 컴퓨터의 호스트네임이 http://backend:3000 이고, api의 uri는 api/post 라고 가정해볼게요. next.js 에서 요청할 때는 http://backend:3000/api/post 주소로 요청을 보내면 되고, 클라이언트 사이드에서 보낸다면 호스트네임 없이 /api/post 보내면 될거에요.",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "2d3d729d-2db3-42aa-ab07-4aed5139bff4",
      created_time: "2021-04-12T16:14:00.000Z",
      last_edited_time: "2021-04-12T16:17:00.000Z",
      has_children: false,
      archived: false,
      type: "code",
      code: {
        text: [
          {
            type: "text",
            text: {
              content:
                'const uri = typeof window === "undefined" ? "http://backend" : "";\n\nexport const post = async() => {\n\ttry{\n\t\taxios.get(`${url}/api/post)\n\t\t...\n\t}\n\tcatch{ ... }\n}',
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text:
              'const uri = typeof window === "undefined" ? "http://backend" : "";\n\nexport const post = async() => {\n\ttry{\n\t\taxios.get(`${url}/api/post)\n\t\t...\n\t}\n\tcatch{ ... }\n}',
            href: null,
          },
        ],
        language: "Bash",
      },
    },
    {
      object: "block",
      id: "6a6706e5-44ab-40d8-a8fc-ca4fe93daaa8",
      created_time: "2021-04-12T16:17:00.000Z",
      last_edited_time: "2021-04-12T16:19:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: {
              content:
                "이렇게 클라이언트, 서버에서 보내는 경우를 구분하여서 요청할 수 있습니다. 코드상에 주소를 노출하기 싫다면 env 를 대입하면 되겠죠? next.js 의 환경변수는 기본적으로 서버사이드에서만 유효하며, 클라이언트에서 사용하기 위해서는 NEXT_PUBLIC_ 이라는 접두어를 붙여야합니다. .env 파일을 정의하고, 아래 코드처럼 사용하면 됩니다.",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text:
              "이렇게 클라이언트, 서버에서 보내는 경우를 구분하여서 요청할 수 있습니다. 코드상에 주소를 노출하기 싫다면 env 를 대입하면 되겠죠? next.js 의 환경변수는 기본적으로 서버사이드에서만 유효하며, 클라이언트에서 사용하기 위해서는 NEXT_PUBLIC_ 이라는 접두어를 붙여야합니다. .env 파일을 정의하고, 아래 코드처럼 사용하면 됩니다.",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "7eb1e42d-b7bd-499b-b119-f5731324fb5f",
      created_time: "2021-04-12T16:17:00.000Z",
      last_edited_time: "2021-04-12T16:19:00.000Z",
      has_children: false,
      archived: false,
      type: "code",
      code: {
        text: [
          {
            type: "text",
            text: {
              content:
                'const uri = typeof window === "undefined" ? process.env.NEXT_PUBLIC_API : "";\n\n...',
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text:
              'const uri = typeof window === "undefined" ? process.env.NEXT_PUBLIC_API : "";\n\n...',
            href: null,
          },
        ],
        language: "Bash",
      },
    },
    {
      object: "block",
      id: "31154658-1c20-4c8e-ab98-eaf1b5b3bb7e",
      created_time: "2021-04-12T15:46:00.000Z",
      last_edited_time: "2021-04-12T15:46:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: {
              content: "📣 참고",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "📣 참고",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "90729253-834a-49b5-9cfa-e9ec7747ed96",
      created_time: "2021-04-12T16:20:00.000Z",
      last_edited_time: "2021-04-12T16:20:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: {
              content:
                "https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly",
              link: {
                url: "https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly",
              },
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text:
              "https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly",
            href: "https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly",
          },
        ],
      },
    },
    {
      object: "block",
      id: "74c99c74-d374-44a8-b2c9-701c8fd4adf5",
      created_time: "2021-04-12T16:20:00.000Z",
      last_edited_time: "2021-04-12T16:21:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: {
              content:
                "https://www.jackherrington.com/csr-ssr-and-ssg-on-nextjs/",
              link: {
                url: "https://www.jackherrington.com/csr-ssr-and-ssg-on-nextjs/",
              },
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text:
              "https://www.jackherrington.com/csr-ssr-and-ssg-on-nextjs/",
            href: "https://www.jackherrington.com/csr-ssr-and-ssg-on-nextjs/",
          },
        ],
      },
    },
    {
      object: "block",
      id: "f92450b7-d1e7-4308-bd0f-cb2e54194b87",
      created_time: "2021-04-12T16:21:00.000Z",
      last_edited_time: "2021-04-12T16:21:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
  ],
  next_cursor: null,
  has_more: false,
};

export const pageBlock1 = {
  object: "list",
  results: [
    {
      object: "block",
      id: "ad27cd34-2ebc-428f-84c7-03d9ebcfbc7c",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "e3c93d4a-97b9-445b-b319-333387658422",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: {
              content: "todo",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "todo",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "5191201a-70b1-4a5c-94d4-e0e256866980",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "0d314da3-9d8d-4b4d-bb31-1d01540c08ff",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "2385eaee-48d1-41be-acc0-27fdab992423",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: {
              content: "✨ 소개",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "✨ 소개",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "d8345931-80d2-4d7b-97c9-5235b3fd0ea6",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "f7e65d8c-e6f0-4625-9fd6-9395cc36a0b0",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: {
              content: "👉🏻 설치",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "👉🏻 설치",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "71e5cb82-8ecc-41dd-aa8b-21e2a82433d9",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "1b4c2c1a-4727-4038-98f5-30f8b7e620dc",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: {
              content: "🎁 방법",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "🎁 방법",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "4bd8217b-15a9-4384-9685-ce3227660815",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "e0277b66-5b18-4e0e-9055-eecae1716e33",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_3",
      heading_3: {
        text: [
          {
            type: "text",
            text: {
              content: "setup lerna",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "setup lerna",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "d421ea2f-4362-4da1-ab62-6d37d8d2474e",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:42:00.000Z",
      has_children: false,
      archived: false,
      type: "code",
      code: {
        text: [
          {
            type: "text",
            text: {
              content: "lerna init -i",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "lerna init -i",
            href: null,
          },
        ],
        language: "JavaScript",
      },
    },
    {
      object: "block",
      id: "9fc7cad6-d9af-494b-8be4-11b33e7b8f9d",
      created_time: "2021-09-29T10:46:00.000Z",
      last_edited_time: "2021-09-29T10:46:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "f7842cf0-0f77-4e4f-82f1-9d68cd855af2",
      created_time: "2021-09-29T10:46:00.000Z",
      last_edited_time: "2021-09-29T10:46:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_3",
      heading_3: {
        text: [
          {
            type: "text",
            text: {
              content: "setup package.json",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "setup package.json",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "1aa0aba2-c7b7-463d-bb2b-4c5c271aacea",
      created_time: "2021-09-29T10:46:00.000Z",
      last_edited_time: "2021-09-29T10:46:00.000Z",
      has_children: false,
      archived: false,
      type: "code",
      code: {
        text: [
          {
            type: "text",
            text: {
              content: '"workspaces": ["./packages/*"]',
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: '"workspaces": ["./packages/*"]',
            href: null,
          },
        ],
        language: "JavaScript",
      },
    },
    {
      object: "block",
      id: "81e7e386-6dff-46b8-b902-fe1b236ad8a6",
      created_time: "2021-09-29T10:46:00.000Z",
      last_edited_time: "2021-09-29T10:46:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "c7a1ea40-8e63-4ef2-b9ed-554f8242c586",
      created_time: "2021-09-29T11:16:00.000Z",
      last_edited_time: "2021-09-29T11:16:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_3",
      heading_3: {
        text: [
          {
            type: "text",
            text: {
              content: "setup lerna.json",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "setup lerna.json",
            href: null,
          },
        ],
      },
    },
    {
      object: "block",
      id: "1f2006e5-e764-41ea-b7e1-b20836706a5e",
      created_time: "2021-09-29T11:16:00.000Z",
      last_edited_time: "2021-09-29T17:05:00.000Z",
      has_children: false,
      archived: false,
      type: "code",
      code: {
        text: [
          {
            type: "text",
            text: {
              content:
                '"npmClient": "yarn",\n"useWorkspaces": true\n\n// experimentd\n"scripts": {\n  "build": "lerna run build"\n},',
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text:
              '"npmClient": "yarn",\n"useWorkspaces": true\n\n// experimentd\n"scripts": {\n  "build": "lerna run build"\n},',
            href: null,
          },
        ],
        language: "JavaScript",
      },
    },
    {
      object: "block",
      id: "0a5079ea-c5f2-4fd8-98e6-3a736780f722",
      created_time: "2021-09-29T13:16:00.000Z",
      last_edited_time: "2021-09-29T13:16:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "049eea81-caf2-42e8-ac5d-b3d88fb02bca",
      created_time: "2021-09-29T13:16:00.000Z",
      last_edited_time: "2021-09-29T13:16:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_3",
      heading_3: {
        text: [],
      },
    },
    {
      object: "block",
      id: "bcd14b07-30cc-4172-a447-f5584138bebf",
      created_time: "2021-09-29T13:16:00.000Z",
      last_edited_time: "2021-09-29T13:16:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "bc9ef38a-285d-4aea-a8d7-55c48fbb8e30",
      created_time: "2021-09-29T10:46:00.000Z",
      last_edited_time: "2021-09-29T13:16:00.000Z",
      has_children: false,
      archived: false,
      type: "paragraph",
      paragraph: {
        text: [],
      },
    },
    {
      object: "block",
      id: "4ff4a4a6-c646-4edc-8780-2dbad59b46db",
      created_time: "2021-09-29T10:41:00.000Z",
      last_edited_time: "2021-09-29T10:41:00.000Z",
      has_children: false,
      archived: false,
      type: "heading_1",
      heading_1: {
        text: [
          {
            type: "text",
            text: {
              content: "📣 참고",
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: "📣 참고",
            href: null,
          },
        ],
      },
    },
  ],
  next_cursor: null,
  has_more: false,
};
