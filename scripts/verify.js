const fs = require('fs');
const path = require('path');

const phases = [
  {
    name: "Phase 1: Schema-driven Renderer",
    check: () => {
      const files = [
        'src/lib/schema.ts',
        'src/components/sections/registry.ts',
        'src/components/sections/SectionRenderer.tsx'
      ];
      return files.every(f => fs.existsSync(path.join(process.cwd(), f)));
    }
  },
  {
    name: "Phase 2: Contentful Integration",
    check: () => {
      return fs.existsSync(path.join(process.cwd(), 'src/lib/contentfulClient.ts'));
    }
  },
  {
    name: "Phase 3: Studio Editor + Redux",
    check: () => {
      const files = [
        'src/lib/store/index.ts',
        'src/lib/store/slices/draftPageSlice.ts',
        'src/lib/store/slices/uiSlice.ts',
        'src/components/studio/Toolbar.tsx',
        'src/components/studio/Sidebar.tsx'
      ];
      return files.every(f => fs.existsSync(path.join(process.cwd(), f)));
    }
  },
  {
    name: "Phase 4: RBAC Enforcement",
    check: () => {
      return fs.existsSync(path.join(process.cwd(), 'src/middleware.ts'));
    }
  },
  {
    name: "Phase 5: Publish Flow + SemVer",
    check: () => {
      return fs.existsSync(path.join(process.cwd(), 'src/lib/publish/semver.ts'));
    }
  },
  {
    name: "Phase 6: Quality Gates (Tests)",
    check: () => {
      return fs.existsSync(path.join(process.cwd(), 'tests/a11y.spec.ts'));
    }
  }
];

console.log("🔍 Starting Sprint Verification...\n");

let allPassed = true;
phases.forEach(phase => {
  const passed = phase.check();
  if (passed) {
    console.log(`✅ ${phase.name}: PASSED`);
  } else {
    console.log(`❌ ${phase.name}: FAILED (Missing files)`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log("\n🎉 All core phases are structurally complete!");
} else {
  console.log("\n⚠️ Some phases are missing core implementation files.");
  process.exit(1);
}
