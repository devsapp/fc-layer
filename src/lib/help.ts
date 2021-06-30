export const PUBLISH = [
  {
    header: 'fc-layer publish',
    content: 'new layer version',
  },
  {
    header: 'Usage',
    content: '$ s publish <options>',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'layer-name',
        description: 'Specify the layer name parameter',
        type: String,
      },
      {
        name: 'code',
        description: 'Specify the code parameter',
        type: String,
      },
      {
        name: 'description',
        description: 'Specify the description parameter',
        type: String,
      },
      {
        name: 'compatible-runtime',
        // alias: 'rt',
        description: 'Specify the compatibleRuntime parameter',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s publish',
      '$ s exec -- publish',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc-layer publish --region cn-hangzhou --layer-name testName --code ./src --compatible-runtime nodejs12,nodejs10,python3',
    ],
  },
];

export const LIST = [
  {
    header: 'fc-layer list',
    content: 'get layer list',
  },
  {
    header: 'Usage',
    content: '$ s list <options>',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'prefix',
        description: 'Specify the prefix parameter',
        type: String,
      }
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
      {
        name: 'table',
        description: 'Table format output',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s list',
      '$ s exec -- list',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc-layer list --region cn-hangzhou --prefix test',
    ],
  },
];

export const VERSION_CONFIG = [
  {
    header: 'fc-layer versionConfig',
    content: 'get layer versionConfig',
  },
  {
    header: 'Usage',
    content: '$ s versionConfig <options>',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'layer-name',
        description: 'Specify the layer name parameter',
        type: String,
      },
      {
        name: 'version',
        description: 'Specify the version parameter',
        type: Number,
      }
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s versionConfig',
      '$ s exec -- versionConfig',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc-layer versionConfig --region cn-hangzhou --layer-name name --version 1',
    ],
  },
];

export const DELETE_VERSION = [
  {
    header: 'fc-layer deleteVersion',
    content: 'get layer deleteVersion',
  },
  {
    header: 'Usage',
    content: '$ s deleteVersion <options>',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'layer-name',
        description: 'Specify the layer name parameter',
        type: String,
      },
      {
        name: 'version',
        description: 'Specify the version parameter',
        type: Number,
      }
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s deleteVersion',
      '$ s exec -- deleteVersion',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc-layer deleteVersion --region cn-hangzhou --layer-name name --version 1',
    ],
  },
];

export const DELETE_LAYER = [
  {
    header: 'fc-layer deleteLayer',
    content: 'get layer deleteLayer',
  },
  {
    header: 'Usage',
    content: '$ s deleteLayer <options>',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'layer-name',
        description: 'Specify the layer name parameter',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s deleteLayer',
      '$ s exec -- deleteLayer',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc-layer deleteLayer --region cn-hangzhou --layer-name name',
    ],
  },
];

export const VERSIONS = [
  {
    header: 'fc-layer versions',
    content: 'get layer versions',
  },
  {
    header: 'Usage',
    content: '$ s versions <options>',
  },
  {
    header: 'Command List',
    optionList: [
      {
        name: 'region',
        description: 'Specify the region parameter',
        type: String,
      },
      {
        name: 'layer-name',
        description: 'Specify the layer name parameter',
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'access',
        description: 'Specify key alias',
        alias: 'a',
        type: Boolean,
      },
      {
        name: 'help',
        description: 'Display help for command',
        alias: 'h',
        type: Boolean,
      },
      {
        name: 'table',
        description: 'Table format output',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      '$ s versions',
      '$ s exec -- versions',
    ],
  },
  {
    header: 'Examples with CLI',
    content: [
      '$ s cli fc-layer versions --region cn-hangzhou --layer-name name',
    ],
  },
];
