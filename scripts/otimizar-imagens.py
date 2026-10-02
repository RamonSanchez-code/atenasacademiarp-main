"""
Otimiza as fotos de public/ para a web, preservando as originais em _originais/.

Como funciona:
  - A primeira vez que ve uma foto, guarda uma copia intacta em _originais/.
  - A versao publicada em public/ e SEMPRE gerada a partir dessa copia original,
    nunca a partir de uma ja comprimida. Por isso rodar o script varias vezes da
    sempre o mesmo resultado, sem perda acumulada de qualidade.
  - Lado maior limitado a 2000px e qualidade JPEG 82 progressivo: na tela fica
    indistinguivel do original, inclusive em monitores retina.
  - Remove todos os metadados (EXIF), que podem conter GPS e dados da camera.
    A orientacao do EXIF e aplicada antes de descartar, para nada sair girado.

Uso:  python scripts/otimizar-imagens.py
      (rode depois de adicionar fotos novas em public/)

A pasta _originais/ fica fora do site publicado e fora do Git (.gitignore).
"""
import os
import shutil
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None  # algumas fotos tem mais de 100 megapixels

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(RAIZ, "public")
ORIG = os.path.join(RAIZ, "_originais")

LADO_MAX = 2000
QUALIDADE = 82
EXTS = (".jpg", ".jpeg", ".png")


def caminhos_relativos():
    """Toda imagem conhecida, venha ela de public/ ou de _originais/."""
    vistos = set()
    for base_dir in (PUB, ORIG):
        if not os.path.isdir(base_dir):
            continue
        for base, _, arquivos in os.walk(base_dir):
            for a in arquivos:
                if a.lower().endswith(EXTS):
                    vistos.add(os.path.relpath(os.path.join(base, a), base_dir))
    return sorted(vistos)


def main():
    antes_tot = depois_tot = 0
    gerados = 0

    for rel in caminhos_relativos():
        publicado = os.path.join(PUB, rel)
        master = os.path.join(ORIG, rel)

        # Na primeira passagem a foto de public/ vira o master.
        if not os.path.exists(master):
            if not os.path.exists(publicado):
                continue
            os.makedirs(os.path.dirname(master), exist_ok=True)
            shutil.copy2(publicado, master)

        antes = os.path.getsize(master)
        antes_tot += antes

        with Image.open(master) as im:
            im = ImageOps.exif_transpose(im)  # endireita antes de descartar o EXIF
            larg, alt = im.size

            if max(larg, alt) > LADO_MAX:
                escala = LADO_MAX / max(larg, alt)
                nova = (max(1, round(larg * escala)), max(1, round(alt * escala)))
                im = im.resize(nova, Image.LANCZOS)
            else:
                nova = (larg, alt)

            os.makedirs(os.path.dirname(publicado), exist_ok=True)
            tmp = publicado + ".tmp"
            if rel.lower().endswith(".png"):
                im.save(tmp, "PNG", optimize=True)
            else:
                if im.mode in ("RGBA", "P", "LA"):
                    im = im.convert("RGB")
                im.save(tmp, "JPEG", quality=QUALIDADE, optimize=True,
                        progressive=True, subsampling="4:2:0")

        depois = os.path.getsize(tmp)
        # Se comprimir nao ajuda (foto ja pequena), publica a original intacta.
        if depois < antes:
            os.replace(tmp, publicado)
            gerados += 1
            print(f"  {rel}: {larg}x{alt} {antes/1048576:.2f}MB "
                  f"-> {nova[0]}x{nova[1]} {depois/1048576:.2f}MB")
        else:
            os.remove(tmp)
            shutil.copy2(master, publicado)
            depois = antes
        depois_tot += depois

    if antes_tot:
        print(f"\nOriginais: {antes_tot/1048576:.1f} MB  ->  publicado: "
              f"{depois_tot/1048576:.1f} MB "
              f"(reducao de {100*(1-depois_tot/antes_tot):.1f}%)")
        print(f"{gerados} imagem(ns) otimizada(s); as demais ja eram leves.")


if __name__ == "__main__":
    main()
