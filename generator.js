const checker = require('license-checker');

const targetPath = process.argv[2];
const targetName = process.argv[3];
if (!targetPath) throw new Error('target path empty');
if (!targetName) throw new Error('target name empty');

const EMPTY_VALUE = '{empty_value}';

checker.init(
  {
    start: targetPath,
    production: true,
    excludePrivatePackages: true,
    customFormat: {
      name: EMPTY_VALUE,
      version: false,
      description: false,
      repository: EMPTY_VALUE,
      publisher: false,
      email: false,
      url: false,
      licenses: false,
      licenseFile: false,
      licenseText: EMPTY_VALUE,
      licenseModified: false,
      copyright: false,
      path: false,
    },
    json: true,
  },
  (err, packages) => {
    if (err) {
      throw new Error(err);
    } else {
      printNotice(targetName, packages);
    }
  }
);

const print = console.log;

const printNotice = (targetName, packages) => {
  printPreface(targetName);
  printPackages(packages);
};

const printPreface = (targetName) => {
  print(
    `THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THAT MAY BE CONTAINED IN PORTIONS OF THE ${targetName.toUpperCase()} PRODUCT.`
  );
  print();
};

const printPackages = (packages) => {
  Object.keys(packages).forEach((key) => {
    printPackage(packages[key]);
  });
};

const printPackage = (package) => {
  print(
    '============================================================================='
  );
  print(`${package.name} (${package.repository})`);
  print(
    '============================================================================='
  );
  print();
  print(package.licenseText);
  print();
};
