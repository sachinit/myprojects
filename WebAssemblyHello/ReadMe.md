git clone https://github.com/juj/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
ls
source ./emsdk_env.sh --build=Release
cd ..
mkdir WebAssemblyHello
cd WebAssemblyHello
cat << EOF > hello.c
#include <stdio.h>
int main(int argc, char ** argv) {
  printf("Hello, world!\\n");
}
EOF
emcc hello.c -s WASM=1 -o hello.html
emrun --no_browser --port 8080 .
history

