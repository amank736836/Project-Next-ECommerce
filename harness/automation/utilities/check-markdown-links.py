#!/usr/bin/env python3
"""Check relative file links in harness Markdown; no dependencies required."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

HARNESS_ROOT = Path(__file__).resolve().parents[2]
LINK_PATTERN = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")
IGNORED_SCHEMES = ("http", "https", "mailto", "tel")


def main() -> int:
    markdown_files = sorted(HARNESS_ROOT.rglob("*.md"))
    broken: list[tuple[Path, str]] = []

    for markdown_file in markdown_files:
        content = markdown_file.read_text(encoding="utf-8")
        for match in LINK_PATTERN.finditer(content):
            raw_target = match.group(1).strip()
            parsed = urlsplit(raw_target)
            if parsed.scheme.lower() in IGNORED_SCHEMES or raw_target.startswith("#"):
                continue
            target = unquote(parsed.path)
            if not target:
                continue
            resolved = (markdown_file.parent / target).resolve()
            if not resolved.exists():
                broken.append((markdown_file.relative_to(HARNESS_ROOT), raw_target))

    if broken:
        print(f"Found {len(broken)} broken relative link(s) in {len(markdown_files)} Markdown files:")
        for markdown_file, target in broken:
            print(f"{markdown_file}: {target}")
        return 1

    print(f"All relative Markdown file links resolve ({len(markdown_files)} files checked).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
