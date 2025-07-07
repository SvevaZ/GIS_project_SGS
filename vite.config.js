/*import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// config options
export default {
    // Complete documentation of Vite configuration on
    //      https://vitejs.dev/config/

    publicDir: "public",

    // Options for the build command
    build: {
        // This is the target build language.
        target: "ES2022",

        // The name of the folder to which the build is stored.
        // As the folder that github pages expects is /docs, we export to /docs folder.
        outDir: 'docs',

        // This builds the dependencies and bundles using the different imports from the pages.
        // It uses index.html as the main entrypoint.
        // Also adds every html file inside the /pages folder.
        // Further pages must be added to the configuration accordingly.
        rollupOptions: {
            input: { 
                main: 'index.html',
                ...Object.fromEntries(
                    globSync('pages/*.html').map(file => [
                        // This remove `pages/` as well as the file extension from each
                        // file, so e.g. src/nested/foo.js becomes nested/foo
                        path.relative(
                            'pages',
                            file.slice(0, file.length - path.extname(file).length)
                        ),
                        // This expands the relative paths to absolute paths, so e.g.
                        // src/nested/foo becomes /project/src/nested/foo.js
                        fileURLToPath(new URL(file, import.meta.url))
                    ])
                ),
            },
        },
    },
  }*/
 import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// config options
export default {
  // Complete documentation of Vite configuration on
  // https://vitejs.dev/config/
  publicDir: "public",
  
  // Assicurati che i CSS siano processati correttamente
  css: {
    // Mantieni i nomi dei file CSS in produzione
    postcss: {},
    // Configurazioni per i CSS modules se necessario
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  
  // Options for the build command
  build: {
    // This is the target build language.
    target: "ES2022",
    
    // The name of the folder to which the build is stored.
    // As the folder that github pages expects is /docs, we export to /docs folder.
    outDir: 'docs',
    
    // Configurazioni per gli assets
    assetsDir: 'assets',
    
    // Mantieni la struttura delle directory per gli assets
    rollupOptions: {
      input: {
        main: 'index.html',
        ...Object.fromEntries(
          globSync('pages/*.html').map(file => [
            // This remove `pages/` as well as the file extension from each
            // file, so e.g. pages/foo.html becomes foo
            path.relative(
              'pages',
              file.slice(0, file.length - path.extname(file).length)
            ),
            // This expands the relative paths to absolute paths
            fileURLToPath(new URL(file, import.meta.url))
          ])
        ),
      },
      output: {
        // Mantieni la struttura degli assets
        assetFileNames: (assetInfo) => {
          // Mantieni i CSS nella cartella assets/css/
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name].[hash][extname]';
          }
          // Per altri assets, mantieni la struttura originale
          return 'assets/[name].[hash][extname]';
        },
        // Configurazione per i chunk JS
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js'
      }
    },
    
    // Copia i file statici mantenendo la struttura
    copyPublicDir: true,
    
    // Configurazioni per il CSS
    cssCodeSplit: false, // Metti tutti i CSS in un unico file se preferisci
    
    // Minificazione
    minify: 'terser',
    
    // Source maps per debug (rimuovi in produzione se non necessario)
    sourcemap: false
  },
  
  // Configurazioni per il server di sviluppo
  server: {
    // Assicurati che i CSS siano serviti correttamente durante lo sviluppo
    fs: {
      // Permetti l'accesso ai file fuori dalla root
      allow: ['..']
    }
  }
}